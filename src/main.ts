import { getPopularMovies } from "./apis/movie/api";
import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
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

// TODO: getPopularMovies try-catch 감싸 -> 에러 핸들링
// TODO 이미지 없는 거 대체 이미지

renderResultSectionContent({ isLoading: true, isError: false, movies: [] });
const popularMovies = await getPopularMovies({ language: "ko-KR" });
const movies = popularMovies.results;

renderThumbnailList({ movies });
renderResultSectionContent({ isLoading: false, isError: false, movies });

// 진입 -> renderResultSectionContent 호출 -> api 호출
// api 호출 시: 요청 -> renderResultSectionContent -> 응답 옴 -> renderResultSectionContent
