import { getPopularMovies, Movie } from "../../apis/movie/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { renderBanner } from "./renderBanner";
import { renderResultSectionContent } from "./renderResultSectionContent";
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
    errorMessage = getErrorMessage(error);
  } finally {
    renderResultSectionContent({
      isLoading: false,
      isError,
      isLastPage,
      errorMessage,
      movies,
    });
  }
};
