import { getPopularMovies, Movie } from "./apis/movie/api";
import { getSearchedMovies } from "./apis/search/api";
import { renderResultSectionContent } from "./dom/render/renderResultSectionContent";
import { renderThumbnailList } from "./dom/render/renderThumbnailList";

const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const banner = document.getElementById("background-container");
const resultSection = document.getElementById("result-section");
const subTitle = document.getElementById("sub-title");

const handleSearch = async (keyword: string) => {
  if (!banner || !subTitle || searchInput?.value.trim() === "") return;

  const searchResult = await getSearchedMovies({
    query: keyword,
    language: "ko-KR",
    page: 1,
  });
  if (searchResult) {
    banner.hidden = true;
    resultSection?.classList.add("result-section");
    subTitle.innerText = `"${keyword}" 검색 결과`;
    const movies = searchResult.results;
    renderResultSectionContent({ isLoading: false, isError: false, movies });
    renderThumbnailList(movies);
  }
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () => handleSearch(searchInput.value));

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(searchInput.value);
  });
}

// TODO: getPopularMovies try-catch 감싸 -> 에러 핸들링
// TODO 이미지 없는 거 대체 이미지

renderResultSectionContent({ isLoading: true, isError: false, movies: [] });
const popularMovies = await getPopularMovies({ language: "ko-KR" });
const movies = popularMovies.results;

renderThumbnailList(movies);

renderResultSectionContent({ isLoading: false, isError: false, movies });

// 진입 -> renderResultSectionContent 호출 -> api 호출
// api 호출 시: 요청 -> renderResultSectionContent -> 응답 옴 -> renderResultSectionContent
