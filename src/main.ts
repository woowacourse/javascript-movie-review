import { getPopularMovies, Movie } from "./apis/movie/api";
import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import { handleMainSeeMore } from "./dom/eventHandler/handleSeeMore";
import { renderBanner } from "./dom/render/renderBanner";
import { renderResultSectionContent } from "./dom/render/renderResultSectionContent";
import { renderThumbnailList } from "./dom/render/renderThumbnailList";

// 로직이 흩어진다...
// 라바: 돔 선언을 하는 곳에서만 하자
// -> 전달받은 함수에서 인자로 받은 돔을 바로 사용 가능 (not 3항연산자)
// -> 밖에서 타입 지정 -> 함수 내에서 타입에 따른 분기까지 있어야 해서 돔을 정하는 과정이 타입 + 홤수 내 분기 2곳으로 흩어진다
// 아지: 같은 돔요소가 여러 곳에 있다!!!
// -> 돔 요소가 변경될 때 두 곳을 모두 수정해야 한다 + 'search' | 'main'처럼 우리가 제어할 수 있는 타입을 선언하자

const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const mainSeeMoreButton = document.getElementById("main-see-more-button");

if (mainSeeMoreButton) {
  mainSeeMoreButton.addEventListener("click", () => {
    handleMainSeeMore();
  });
}

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
