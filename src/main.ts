import { getPopularMovies, Movie } from "./apis/movie/api";
import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import { renderBanner } from "./dom/render/renderBanner";
import { renderResultSectionContent } from "./dom/render/renderResultSectionContent";
import { renderThumbnailList } from "./dom/render/renderThumbnailList";

const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () =>
    handleMovieSearch(searchInput.value),
  );

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleMovieSearch(searchInput.value);
  });
}

// TODO 이미지 없는 거 대체 이미지
// TODO: popular movies 없는 경우 배너 대체 UI

const render = async () => {
  let isError = false;
  let isLastPage = false;
  let movies: Movie[] = [];

  try {
    const thumbnailListElement = document.getElementById("main-thumbnail-list");
    const popularMovies = await getPopularMovies({ language: "ko-KR" });
    isLastPage = popularMovies.page === popularMovies.total_pages;
    movies = popularMovies.results;
    renderBanner({ movie: movies[0] });
    renderThumbnailList({ movies, thumbnailListElement });
  } catch (error) {
    isError = true;
  } finally {
    renderResultSectionContent({
      isLoading: false,
      isError,
      isLastPage,
      movies,
    });
  }
};

renderResultSectionContent({
  isLoading: true,
  isError: false,
  isLastPage: false,
  movies: [],
});
await render();

// 진입 -> renderResultSectionContent 호출 -> api 호출
// api 호출 시: 요청 -> renderResultSectionContent -> 응답 옴 -> renderResultSectionContent
