import { fetchMoviesApi } from "./features/api/fetchMoviesApi";
import MovieList from "./features/UI/MovieList";
import { Header } from "./features/UI/Header";
import { Movie } from "../types/types";

let page: number = 1;
const MovieListInstance = new MovieList();

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  // 초기 렌더링
  const data = await handleMovie();
  handleHeader(data.results[0]);
  handleMovieList(data);
  updateMoreButton(moreButton, data);

  // 검색
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    page = 1;

    const searchInput = document.querySelector(
      ".search-input",
    ) as HTMLInputElement;
    const searchMovie = searchInput.value.trim();

    if (searchMovie === "") {
      MovieListInstance.clearList();

      MovieListInstance.renderSkeleton();
      const data: { results: Movie[]; total_pages: number } =
        await fetchMoviesApi("movie/popular", page);
      handleHeader(data.results[0]);
      handleMovieList(data);

      const mainTitle = document.querySelector(".main-title") as HTMLElement;
      mainTitle.textContent = "지금 인기 있는 영화";

      updateMoreButton(moreButton, data);
      return;
    }

    const data: { results: Movie[]; total_pages: number } =
      await fetchMoviesApi("search/movie", page, searchMovie);
    handleHeaderSearch();
    handleMovieList(data);

    const mainTitle = document.querySelector(".main-title") as HTMLElement;
    mainTitle.textContent = `"${searchMovie}" 검색 결과`;

    if (data.results.length === 0) {
      MovieListInstance.showEmpty();
    }

    updateMoreButton(moreButton, data);
  });
});

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  fetchApi();
});

// 인기 영화 fetch
async function fetchApi(): Promise<{ results: Movie[]; total_pages: number }> {
  const data: { results: Movie[]; total_pages: number } = await fetchMoviesApi(
    "movie/popular",
    page,
  );
  return data;
}

// 더보기 버튼
function updateMoreButton(
  moreButton: HTMLButtonElement,
  data: { results: Movie[]; total_pages: number },
): void {
  if (data.total_pages === page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}

// 검색폼 핸들러
function handleHeaderSearch(): void {
  Header.clearHeader();
  Header.renderSearch();
}

// 헤더 핸들러
function handleHeader(movie: Movie): void {
  Header.clearHeader();
  Header.render(movie);
}

// 영화 리스트 핸들러
function handleMovieList(data: {
  results: Movie[];
  total_pages: number;
}): void {
  MovieListInstance.clearList();
  MovieListInstance.renderMovieList(data);
}

async function handleMovie(): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    MovieListInstance.renderSkeleton();
    const data: { results: Movie[]; total_pages: number } = await fetchApi();
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
