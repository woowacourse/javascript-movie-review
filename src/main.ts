import { getPopularMovies, Movie } from "./apis/movie/api";

const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const banner = document.getElementById("background-container");
const resultSection = document.getElementById("result-section");
const subTitle = document.getElementById("sub-title");

let movies: Movie[] = [];
let isError: boolean = false;
let isLoading: boolean = true;

const handleSearch = (keyword: string) => {
  if (!banner || !subTitle || searchInput?.value.trim() === "") return;
  banner.hidden = true;
  resultSection?.classList.add("result-section");
  subTitle.innerText = `"${keyword}" 검색 결과`;
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () => handleSearch(searchInput.value));

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(searchInput.value);
  });
}

const renderResultSectionContent = (
  isLoading: boolean,
  isError: boolean,
  movies: Movie[],
) => {
  console.log(isLoading, isError, movies);

  if (isLoading) {
    const skeletonList = document.getElementById("skeleton-list");
    skeletonList?.classList.remove("hidden");
    return;
  }

  if (isError) {
    const errorContainer = document.getElementById("error-container");
    errorContainer?.classList.remove("hidden");
    return;
  }

  if (movies.length > 0) {
    const thumbnailList = document.getElementById("thumbnail-list");
    thumbnailList?.classList.remove("hidden");
    return;
  }

  const emptyContainer = document.getElementById("empty-container");
  emptyContainer?.classList.remove("hidden");
};

renderResultSectionContent(isLoading, isError, movies);
const popularMovies = await getPopularMovies({ language: "ko-KR" });
console.log(popularMovies);
movies = popularMovies.results;

const thumbnailList = document.getElementById("thumbnail-list");
if (thumbnailList) {
  console.log("hi");
  const lis = movies.map(
    (movie) => `<li id="movie-${movie.id}">
                <div class="item">
                  <img
                    class="thumbnail"
                    src="${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}"
                    alt="${movie.title} 포스터"
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="./images/star_empty.png" class="star" /><span
                        >${movie.vote_average}</span
                      >
                    </p>
                    <strong>${movie.title}</strong>
                  </div>
                </div>
              </li>`,
  );
  thumbnailList.innerHTML = lis.join("");
  isLoading = false;
}

const skeletonList = document.getElementById("skeleton-list");
skeletonList?.classList.add("hidden");
renderResultSectionContent(isLoading, isError, movies);

// 진입 -> renderResultSectionContent 호출 -> api 호출
// api 호출 시: 요청 -> renderResultSectionContent -> 응답 옴 -> renderResultSectionContent
