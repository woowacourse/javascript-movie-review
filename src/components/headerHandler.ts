import { $ } from "../utils/selector";
import { movieApi, resetMoviesAndPages } from "../domain/movieApi";
import { PATH } from "../constants";
const { SEARCHED_MOVIE } = PATH;

export const onSubmitSearchBox = () => {
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

export const onClickLogo = () => {
  $("#logo").addEventListener("click", () => {
    resetMoviesAndPages();
    $<HTMLFormElement>(".search-box").reset();

    movieApi.showMovies();
  });
};
