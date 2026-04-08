import { getPopularMovies, Movie } from "../../apis/movie/api";
import TMDBError from "../../TMDBError";
import { renderBanner } from "./renderBanner";
import {
  renderMain,
  renderMainEmpty,
  renderMainError,
} from "./renderResultSectionContent";
import { renderThumbnailList } from "./renderThumbnailList";

export const renderMainUI = async () => {
  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  try {
    const thumbnailListElement = document.getElementById("main-thumbnail-list");
    const popularMovies = await getPopularMovies({ language: "ko-KR" });
    isLastPage = popularMovies.page === popularMovies.total_pages;
    movies = popularMovies.results;
    renderBanner({ movie: movies[0] });
    renderThumbnailList({ movies, thumbnailListElement });
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    if (isError) {
      renderMainError(errorMessage);
    } else if (movies.length === 0) {
      renderMainEmpty();
    } else {
      renderMain(isLastPage);
    }
  }
};
