import useGetMoreMovieList from "./apis/movies/useGetMoreMovieList";
import useGetMovieList from "./apis/movies/useGetMovieList";
import Button from "./components/@common/Button";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import Skeleton from "./components/skeleton/Skeleton";
import {
  movies,
  searchInputValue,
  searchResults,
  setMovies,
  totalResults,
  isLoading,
  isError,
  isMoreError,
  isSearchError,
} from "./store/store";
import { useEvents } from "./utils/Core";

const App = () => {
  const { fetchMovies } = useGetMovieList();
  const { fetchMoreMovies } = useGetMoreMovieList();

  const [addEvent] = useEvents(".app-layout");

  addEvent("click", ".more-button", () => {
    fetchMoreMovies(fetchMovies);
    console.log("more movie length :", movies.length); // 40개 전달됨
  });

  if (movies.length === 0) {
    fetchMovies(1).then((results) => {
      if (results) {
        setMovies(results);
      }
    });
  }

  const displayMovieList =
    searchInputValue.trim().length > 0 ? searchResults : movies;
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
        searchInputValue.length > 0
          ? `${searchInputValue} 검색 결과`
          : "지금 인기 있는 영화"
      }</h1>

      ${
        isSearchError
          ? `<div class="no-results">검색 결과를 불러오는데 실패하였습니다.</div>`
          : ""
      }
      ${
        searchInputValue.length > 0 && displayMovieList.length === 0
          ? `<div class="no-results">검색 결과가 없습니다.</div>`
          : `<ul class="thumbnail-list">
              ${displayMovieList
                .map((movie) => {
                  return isLoading
                    ? Skeleton()
                    : MovieItem({
                        title: movie.title,
                        rate: movie.vote_count,
                        src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      });
                })
                .join("")}
            </ul>
      ${isMoreError ? `<div>영화 목록을 불러오는 데 실패했습니다.</div>` : ""}
    ${
      displayMovieList.length < totalResults
        ? Button({
            attribute: {
              class: "primary detail more-button",
            },
            children: "더 보기",
          })
        : ""
    }`
      }
    </div>
    ${Footer()}
    `;
};

export default App;
