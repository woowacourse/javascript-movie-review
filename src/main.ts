import { getMovieByName, getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";
import Button from "./components/Button";
import { isElement } from "./utils";
import { MAX_MOVIE_PAGE } from "./constants/costants";
import { MovieResult } from "../types/movieApiType";

addEventListener("load", async () => {
  let page = 1;
  let totalPages: number = 1;
  let movies: MovieResult[] = (await getMovies({ page })).results;
  let searchKeyword = "";

  const $mainSection = document.querySelector("main section");
  const $container = document.querySelector(".container");
  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  const renderMoviesList = async () => {
    if (searchKeyword === "") {
      const moviesResponse = await getMovies({ page });
      movies = moviesResponse.results;
      totalPages = moviesResponse.total_pages;
    } else {
      const moviesResponse = await getMovieByName({
        name: searchKeyword,
        page,
      });
      movies = moviesResponse.results;
      totalPages = moviesResponse.total_pages;
    }

    const $movies = MovieList(movies);
    if ($movies) $mainSection?.appendChild($movies);
  };

  renderMoviesList();

  window.addEventListener("click", async (event) => {
    const { target } = event;

    if (isElement(target) && target.closest(".show-more")) {
      page = page + 1;
      renderMoviesList();
      if (page === Math.min(MAX_MOVIE_PAGE, totalPages)) {
        document.querySelector(".show-more")?.remove();
        return;
      }
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

        const response = await getMovieByName({ name: searchKeyword, page });

        const $ul = document.querySelector(".thumbnail-list");
        if ($ul) $ul.innerHTML = "";

        movies = response.results;
        renderMoviesList();
      }
    }
  });
});
