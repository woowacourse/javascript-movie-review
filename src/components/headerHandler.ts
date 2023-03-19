import { $ } from "../utils/selector";
import { movieApi, resetMoviesAndPages } from "../domain/movieApi";

export const onSubmitSearchBox = () => {
  $(".search-box").addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const keyword = String(formData.get("search-bar"));

      if (keyword === "") return;

      movieApi.last_keyword = keyword;
      resetMoviesAndPages();
      movieApi.showSearchedMovies(keyword);
    }
  });
};

export const onClickLogo = () => {
  $("#logo").addEventListener("click", () => {
    resetMoviesAndPages();
    movieApi.last_keyword = "";

    movieApi.showPopularMovies();
  });
};
