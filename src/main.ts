import { getMovieByName, getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";
import Button from "./components/Button";
import { isElement } from "./utils";
import { MAX_MOVIE_PAGE } from "./constants/costants";
import { MovieResult } from "../types/movieApiType";

addEventListener("load", async () => {
  let page = 1;
  let movies: MovieResult[] = (await getMovies({ page: page })).results;

  const $mainSection = document.querySelector("main section");
  const $container = document.querySelector(".container");
  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  const renderMoviesList = () => {
    const $movies = MovieList(movies);
    if ($movies) $mainSection?.appendChild($movies);
  };

  renderMoviesList();

  window.addEventListener("click", async (event) => {
    const { target } = event;

    if (isElement(target) && target.closest(".show-more")) {
      page = page + 1;
      renderMoviesList();
      if (page === MAX_MOVIE_PAGE) {
        document.querySelector(".show-more")?.remove();
        return;
      }
    }
  });

  window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { target } = event;

    if (isElement(target) && target.closest(".top-rated-search")) {
      const value = (
        target.querySelector(".top-rated-search-input") as HTMLInputElement
      )?.value;

      if (value) {
        page = 1;
        const response = await getMovieByName({ name: value, page });
        if ($mainSection) $mainSection.innerHTML = "";
        movies = response.results;
        renderMoviesList();
      }
    }
  });
});
