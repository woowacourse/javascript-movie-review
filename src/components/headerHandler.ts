import { $ } from "../utils/selector";
import { movieApi } from "../domain/movieApi";
import { PATH } from "../constants";
import { movieStore } from "../domain/movieStore";
const { SEARCHED_MOVIE } = PATH;

export const initSearchBox = () => {
  $(".search-box").addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const keyword = String(formData.get("search-bar")).trim();

      if (keyword.length < 1) return;

      movieApi.urlParams.set("query", keyword);
      resetMoviesAndPages();
      movieApi.showMovies(SEARCHED_MOVIE, keyword);
    }
  });
};

export const initLogo = () => {
  $("#logo").addEventListener("click", () => {
    resetMoviesAndPages();
    $<HTMLFormElement>(".search-box").reset();

    movieApi.showMovies();
  });
};

const resetMoviesAndPages = () => {
  movieStore.movies = [];
  movieApi.urlParams.set("page", "1");
  movieApi.totalPage = 2;
};
