import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import { movieApi, resetMoviesAndPages } from "../domain/movieApi";

export const onSubmitSearchBox = () => {
  executeEventListener($(".search-box"), "submit", (event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));

    if (keyword === "") return;

    movieApi.last_keyword = keyword;
    resetMoviesAndPages();
    movieApi.showSearchedMovies(keyword);
  });
};

export const onClickLogo = () => {
  executeEventListener($("#logo"), "click", () => {
    resetMoviesAndPages();
    movieApi.last_keyword = "";

    movieApi.showPopularMovies();
  });
};
