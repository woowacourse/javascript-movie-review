import { getMovieList } from "./features/movie/api/getMovieList";
import MoviePost from "./features/movie/ui/MoviePost";
import Header from "./shared/ui/Header";
import { IMovie } from "./shared/types/movies";
import { CustomButton } from "./shared/ui/CustomButton";
import { getSearchedPost } from "./features/search/api/getSearchedPost";
import EmptySearchResult from "./features/search/ui/EmptySearchResult";
import { createSkeletons } from "./features/movie/ui/MovieSkeleton";
import "./styles/skeleton.css";
import "./styles/loading-indicator.css";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement | null;

  // 첫 로딩 시 스켈레톤 UI 표시
  if ($movieList) {
    showSkeletons($movieList);
  }

  const movies = await getMovieList({ page: 1 });

  Header(movies.results[0]);

  if ($movieList) {
    // 데이터 로드 후 스켈레톤 UI를 실제 데이터로 교체
    $movieList.innerHTML = "";
    addMoviePost(movies.results, $movieList);
  }

  const $movieContainer = document.getElementById("movie-container");
  const addMoreMoviesButton = CustomButton({ title: "더보기" });
  addMoreMoviesButton.id = "more-movies-button";
  $movieContainer?.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.addEventListener("click", async () => {
    if (!$movieList) return;

    // 더보기 버튼 클릭 시 로딩 상태 표시
    const loadingIndicator = document.createElement("div");
    loadingIndicator.classList.add("loading-indicator");
    $movieList.appendChild(loadingIndicator);

    await addMoreMovies($movieList);

    // 로딩 완료 후 로딩 인디케이터 제거
    const indicator = document.querySelector(".loading-indicator");
    indicator?.remove();
  });

  const searchForm = document.querySelector(".search-form");

  searchForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const $thumbnailList = document.querySelector(
      ".thumbnail-list"
    ) as HTMLElement | null;

    if ($thumbnailList) {
      // 검색 시작 시 기존 결과 제거하고 스켈레톤 UI 표시
      $thumbnailList.innerHTML = "";
      showSkeletons($thumbnailList);
    }

    const $overlay = document.querySelector(".overlay");
    $overlay?.classList.add("disabled");

    const $topRatedMovie = document.querySelector(".top-rated-movie");
    $topRatedMovie?.classList.add("disabled");

    const $backgroundContainer = document.querySelector(
      ".background-container"
    );
    $backgroundContainer?.classList.add("background-container-disabled");

    const $movieListTitle = document.querySelector(".movie-list-title");

    const formData = new FormData(e.target as HTMLFormElement);
    let searchQuery = formData.get("search-input");

    if ($movieListTitle) {
      $movieListTitle.textContent = `"${searchQuery}" 검색 결과`;
    }

    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");

    if (!page) {
      params.append("page", "1");
      params.append("query", searchQuery as string);
    } else {
      params.set("page", "1");
      params.set("query", searchQuery as string);
    }

    const searchedMovies = await getSearchedPost(
      searchQuery as string,
      parseInt(params.get("page")!)
    );

    if ($thumbnailList) {
      // 검색 결과 로드 후 스켈레톤 UI를 실제 데이터로 교체
      $thumbnailList.innerHTML = "";
      addMoviePost(searchedMovies.results, $thumbnailList);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, "", newUrl);
  });
});

// 스켈레톤 UI를 표시하는 함수
function showSkeletons($container: HTMLElement, count: number = 10) {
  $container.appendChild(createSkeletons(count));
}

function addMoviePost(movieList: IMovie[], $movieList: HTMLElement) {
  if (movieList.length === 0) {
    showEmptySearchResult();

    return;
  }

  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );
  const $moreMoviesButton = document.getElementById("more-movies-button");

  if ($emptySearchResult) {
    $emptySearchResult.remove();
    $moreMoviesButton?.classList.remove("disabled");
  }

  movieList.forEach((movie: IMovie) => {
    $movieList.appendChild(MoviePost(movie));
  });
}

async function addMoreMovies($movieList: HTMLElement) {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const query = params.get("query");

  if (!page) {
    params.append("page", "2");
  } else {
    params.set("page", (parseInt(page) + 1).toString());
  }

  if (query) {
    const searchedMovies = await getSearchedPost(
      query as string,
      parseInt(params.get("page")!)
    );

    addMoviePost(searchedMovies.results, $movieList);
    disableMoreButton(
      searchedMovies.total_pages,
      parseInt(params.get("page")!)
    );
  } else {
    const movies = await getMovieList({ page: parseInt(params.get("page")!) });

    addMoviePost(movies.results, $movieList);
    disableMoreButton(movies.total_pages, parseInt(params.get("page")!));
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
}

function disableMoreButton(totalPages: number, currentPage: number) {
  const $moreMoviesButton = document.getElementById("more-movies-button");
  if (totalPages === currentPage) {
    $moreMoviesButton?.classList.add("disabled");
  }
}

function showEmptySearchResult() {
  const $movieContainer = document.getElementById("movie-container");
  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );

  if (!$emptySearchResult) {
    $movieContainer?.appendChild(EmptySearchResult());
  }

  const $moreMoviesButton = document.getElementById("more-movies-button");
  $moreMoviesButton?.classList.add("disabled");
}
