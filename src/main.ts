import { getMovieByName, getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";
import Button from "./components/Button";
import { isElement } from "./utils";
import { DEFAULT_BACK_DROP_URL, MAX_MOVIE_PAGE } from "./constants/costants";
import { MovieResult } from "../types/movieApiType";
import TopRatedMovie from "./components/TopRatedMovie";
import MovieListSkeleton from "./components/MovieListSkeleton";

addEventListener("load", async () => {
  let page = 1;
  let totalPages: number = 1;
  let movies: MovieResult[] = [];
  let searchKeyword = "";

  const $mainSection = document.querySelector("main section");
  const $container = document.querySelector(".container");
  const $ul = document.querySelector(".thumbnail-list");
  const $error = document.querySelector(".error");
  const $h2 = $error?.querySelector("h2");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  const renderMoviesList = async () => {
    const $skeleton = MovieListSkeleton();

    if ($skeleton) $mainSection?.appendChild($skeleton);

    if (searchKeyword === "") {
      // loading = true
      try {
        const moviesResponse = await getMovies({ page });
        // loading = false
        movies = [...movies, ...moviesResponse.results];
        totalPages = moviesResponse.total_pages;
      } catch (error: any) {
        $ul?.classList.add("close");
        $error?.classList.remove("close");

        if ($ul) $ul.innerHTML = "";

        if (error.message === "400" && $h2) {
          // page = 501
          $h2.textContent = "검색 가능한 페이지 수를 넘겼습니다.";
        }
        if (error.message === "401" && $h2) {
          console.log(error);

          // 토큰 인증 오류
          $h2.textContent =
            "사용자 인증 정보가 잘못되었습니다. 정보를 다시 확인해주세요.";
        }
        return;
      }

      if (!document.querySelector(".top-rated-movie")) {
        // 인기영화 정보 보여주기
        const $topRatedContainer = document.querySelector(
          ".top-rated-container"
        );
        $topRatedContainer?.append(
          TopRatedMovie({
            title: movies[0].title,
            voteAverage: movies[0].vote_average,
          })
        );
      }

      /** 헤더 백그라운드 */
      const $backgroundContainer = document.querySelector(
        ".background-container"
      );
      const backgroundImage = movies[0].backdrop_path
        ? `${DEFAULT_BACK_DROP_URL}${movies[0].backdrop_path}`
        : "./images/default_thumbnail.jpeg";
      ($backgroundContainer as HTMLElement)!.style.backgroundImage = `url(${backgroundImage})`;
    } else {
      // loading = true
      const moviesResponse = await getMovieByName({
        name: searchKeyword,
        page,
      });
      // loading = false
      movies = [...movies, ...moviesResponse.results];

      if (movies.length === 0) {
        $ul?.classList.add("close");
        $error?.classList.remove("close");
        if ($h2) $h2.textContent = "검색 결과가 없습니다.";
      } else {
        $ul?.classList.remove("close");
        $error?.classList.add("close");
      }

      totalPages = moviesResponse.total_pages;
    }

    const $showMore = document.querySelector(".show-more");
    if (page !== Math.min(MAX_MOVIE_PAGE, totalPages)) {
      $showMore?.classList.add("open");
    } else {
      $showMore?.classList.remove("open");
    }

    // loading 전달
    if ($ul) $ul.innerHTML = "";
    const $movies = MovieList(movies);
    if ($movies) $mainSection?.appendChild($movies);
  };

  renderMoviesList();

  window.addEventListener("click", async (event) => {
    const { target } = event;

    if (isElement(target) && target.closest(".show-more")) {
      page = page + 1;
      renderMoviesList();
    }
  });

  window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { target } = event;

    if (isElement(target) && target.closest(".top-rated-search")) {
      const $searchInput = target.querySelector(
        ".top-rated-search-input"
      ) as HTMLInputElement;
      const value = $searchInput?.value;

      (target as HTMLFormElement).reset();

      if (value) {
        searchKeyword = value;
        page = 1;

        const $title = document.querySelector(".thumbnail-title");
        if ($title) $title.textContent = `"${searchKeyword}" 검색 결과`;

        const $ul = document.querySelector(".thumbnail-list");
        if ($ul) $ul.innerHTML = "";

        const $topRatedContainer = document.querySelector(
          ".top-rated-container"
        );
        const $overlay = document.querySelector(".overlay");

        $topRatedContainer?.classList.add("close");
        $overlay?.classList.add("close");

        movies = [];

        renderMoviesList();
      }
    }
  });
});
