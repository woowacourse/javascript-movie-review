import ErrorMessage from "./components/errorMessage/ErrorMessage";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieDetailModal from "./components/modal/MovieDetailModal";
import MovieList from "./components/movieList/MovieList";
import SearchResultMessage from "./components/searchResultMessage/SearchResultMessage";
import useMovieDetail from "./hooks/useMovieDetail";
import useMovieList from "./hooks/useMovieList";
import {
  movies,
  searchInputValue,
  searchResults,
  isError,
  isSearchError,
  movieDetail,
  isOpenModal,
} from "./store/store";
import { useEvents } from "./utils/Core";
import { renderIf, renderIfString } from "./utils/render";

const App = () => {
  const { handleMovieItemClick } = useMovieDetail();
  const { isLoading, isMoreError, setupInfiniteScroll, loadInitialMovies } =
    useMovieList();
  const [addEvent] = useEvents(".thumbnail-list");

  addEvent("click", ".item-container", async (e) => {
    const itemContainer = (e.target as HTMLElement).closest(
      ".item-container"
    ) as HTMLElement;
    if (!itemContainer) return;

    const movieId = itemContainer.dataset.id;
    if (!movieId) return;

    await handleMovieItemClick(movieId);
  });

  setupInfiniteScroll();

  loadInitialMovies();

  const displayMovieList = searchResults.length > 0 ? searchResults : movies;
  const isSearchMode = searchResults.length > 0;

  const headerContent = renderIf(
    isError || !movies.length,
    ErrorMessage({
      children: "에러가 발생했습니다. 다시 시도해주세요.",
      attribute: {
        class: "movie-list-error",
      },
    }),
    Header({
      rate: movies[0]?.vote_count ?? 0,
      title: movies[0]?.title ?? "",
      src: movies[0]?.backdrop_path ?? "",
    })
  );

  const subTitle = renderIfString(
    isSearchMode,
    `검색 결과`,
    "지금 인기 있는 영화"
  );

  const moreErrorMessage = renderIfString(
    isMoreError,
    ErrorMessage({
      children: "영화 목록을 불러오는 데 실패했습니다.",
      attribute: {
        class: "error-message",
      },
    })
  );

  const modalContent = renderIfString(
    isOpenModal && !!movieDetail,
    MovieDetailModal({
      title: movieDetail?.title ?? "",
      rate: movieDetail?.vote_average ?? 0,
      src: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
      description: movieDetail?.overview ?? "",
      genres: movieDetail?.genres
        ? movieDetail.genres.map((g) => g.name).join(", ")
        : "",
      releaseDate: movieDetail?.release_date ?? "",
      id: movieDetail?.id ?? 0,
    })
  );

  return ` 
    ${headerContent}
  
    <div class="app-layout">
      <h1 class="sub-title">${subTitle}</h1>
      ${SearchResultMessage({
        isError: isSearchError,
        attribute: {
          class: "no-results",
        },
        children: "검색 결과를 불러오는데 실패하였습니다.",
      })}
      ${MovieList({
        movies: displayMovieList,
        isLoading,
        isSearchMode,
        searchQuery: searchInputValue,
      })}
      ${moreErrorMessage}
    </div>
    
    ${Footer()}
    ${modalContent}
  `;
};

export default App;
