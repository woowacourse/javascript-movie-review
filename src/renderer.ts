import Header from "./components/header/Header";
import MovieItem from "./components/movieItem/MovieItem";
import Skeleton from "./components/skeleton/Skeleton";
import {
  isError,
  isMoreError,
  isSearchError,
  movies,
  searchInputValue,
  searchResults,
} from "./store/store";

export const headerRender = () => {
  if (isError || !movies.length)
    return `<div class="movie-list-error">에러가 발생했습니다. 다시 시도해주세요.</div>`;
  else
    return Header({
      id: movies[0]?.id ?? "",
      rate: movies[0]?.vote_count ?? 0,
      title: movies[0]?.title ?? "",
      src: movies[0]?.backdrop_path ?? "",
    });
};

export const subTitleRenderer = () => {
  if (searchInputValue.length > 0) return `${searchInputValue} 검색 결과`;
  else return "지금 인기 있는 영화";
};

export const movieListRenderer = () => {
  const displayMovieList =
    searchInputValue.trim().length > 0 ? searchResults : movies;

  if (searchInputValue.length > 0 && displayMovieList.length === 0)
    return `<div class="no-results">검색 결과가 없습니다.</div>`;
  else {
    return `<ul class="thumbnail-list">
              ${displayMovieList
                .map((movie) => {
                  return movie.isLoading
                    ? Skeleton()
                    : MovieItem({
                        id: movie.id,
                        title: movie.title,
                        rate: movie.vote_average,
                        src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      });
                })
                .join("")}
            </ul>`;
  }
};

export const serverSearchError = () => {
  if (isSearchError)
    return `<div class="search-server-error">검색 결과를 불러오는데 실패하였습니다.</div>`;
  else return "";
};

export const moreMovieServerError = () => {
  if (isMoreError)
    return `<div class='more-error'>영화 목록을 불러오는 데 실패했습니다.</div>`;
  else return "";
};
