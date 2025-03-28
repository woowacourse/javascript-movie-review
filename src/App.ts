import useGetMoreMovieList from "./apis/movies/useGetMoreMovieList";
import useGetMovieDetail from "./apis/movies/useGetMovieDetail";
import useGetMovieList from "./apis/movies/useGetMovieList";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieDetailModal from "./components/modal/MovieDetailModal";
import MovieItem from "./components/movieItem/MovieItem";
import SkeletonList from "./components/skeletonList/SkeletonList";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import {
  movies,
  searchInputValue,
  searchResults,
  setMovies,
  totalResults,
  isError,
  isSearchError,
  setSelectedMovieId,
  setMovieDetail,
  movieDetail,
  setIsOpenModal,
  isOpenModal,
} from "./store/store";
import { useEvents } from "./utils/Core";

const App = () => {
  const { fetchMovies, isLoading } = useGetMovieList();
  const { fetchMoreMovies, isMoreError } = useGetMoreMovieList();
  const { fetchMovieDetail } = useGetMovieDetail();
  const [addEvent] = useEvents(".thumbnail-list");

  addEvent("click", ".item-container", async (e) => {
    const itemContainer = (e.target as HTMLElement).closest(
      ".item-container"
    ) as HTMLElement;

    if (itemContainer) {
      const movieId = itemContainer.dataset.id;
      if (movieId) {
        setSelectedMovieId(movieId);

        const detail = await fetchMovieDetail(movieId);
        if (detail) {
          setMovieDetail(detail);
          setIsOpenModal(true);
        }
      }
    }
  });

  if (movies.length < totalResults) {
    useInfiniteScroll(() => {
      fetchMoreMovies(fetchMovies);
    });
  }

  if (movies.length === 0) {
    fetchMovies(1).then((results) => {
      if (results) {
        setMovies(results.data ?? []);
      }
    });
  }

  const displayMovieList = searchResults.length > 0 ? searchResults : movies;

  return ` ${
    isError || !movies.length
      ? `<div class="movie-list-error">에러가 발생했습니다. 다시 시도해주세요.</div>`
      : Header({
          rate: movies[0]?.vote_count ?? 0,
          title: movies[0]?.title ?? "",
          src: movies[0]?.backdrop_path ?? "",
        })
  }
  
    <div class="app-layout">
      <h1 class="sub-title">${
        searchResults.length > 0 ? `검색 결과` : "지금 인기 있는 영화"
      }</h1>

      ${
        isSearchError
          ? `<div class="no-results">검색 결과를 불러오는데 실패하였습니다.</div>`
          : ""
      }
      ${
        searchResults.length === 0 && searchInputValue.trim().length > 0
          ? `<div class="no-results">검색 결과가 없습니다.</div>`
          : `${
              isLoading && movies.length === 0
                ? `${SkeletonList()}`
                : `<ul class="thumbnail-list">
                    ${displayMovieList
                      .map((movie) =>
                        MovieItem({
                          title: movie.title,
                          rate: movie.vote_count,
                          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                          id: movie.id.toString(),
                        })
                      )
                      .join("")}
                  </ul>`
            }
      ${isMoreError ? `<div>영화 목록을 불러오는 데 실패했습니다.</div>` : ""}
    `
      }
    </div>
    ${Footer()}
    ${
      isOpenModal && movieDetail
        ? MovieDetailModal({
            title: movieDetail.title,
            rate: movieDetail.vote_average,
            src: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
            description: movieDetail.overview,
            genres: movieDetail.genres
              ? movieDetail.genres.map((g) => g.name).join(", ")
              : "",
            releaseDate: movieDetail.release_date,
          })
        : ""
    }
    `;
};

export default App;
