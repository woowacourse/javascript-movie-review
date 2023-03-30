import { $ } from "../../utils/selector";
import { movieApi } from "../../domain/movieApi";
import { PATH } from "../../constants";
import { movieStore } from "../../movieStore";
const { SEARCHED_MOVIE } = PATH;

export const initSearchBox = () => {
  $(".search-box").addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const keyword = String(formData.get("search-bar")).trim();
      $<HTMLInputElement>(".search-input").focus();

      if (keyword.length < 1 || keyword === movieApi.urlParams.get("query"))
        return;

      movieApi.urlParams.set("query", keyword);
      resetMoviesAndPages();
      movieApi.showMovies(SEARCHED_MOVIE, keyword);

      toggleLogo();
    }
  });
};

export const initLogo = () => {
  $("button.logo").addEventListener("click", () => {
    resetMoviesAndPages();
    $<HTMLFormElement>(".search-box").reset();

    movieApi.showMovies();
    toggleLogo();
  });
};

const resetMoviesAndPages = () => {
  movieStore.movies = [];
  movieApi.urlParams.set("page", "1");
  movieApi.totalPage = 2;
};

const toggleLogo = () => {
  if (movieApi.url.pathname.includes(PATH.POPULAR_MOVIE)) {
    $("button.logo").classList.add("none-display");
    $("img.logo").classList.remove("none-display");
  } else {
    $("button.logo").classList.remove("none-display");
    $("img.logo").classList.add("none-display");
  }
};
