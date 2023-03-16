import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import { movieApi, resetMoviesAndPages } from "../domain/movieApi";

export const onSubmitSearchBox = () => {
  executeEventListener($(".search-box"), "submit", async (event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));
    movieApi.last_keyword = keyword;

    resetMoviesAndPages();

    await movieApi.showSearchedMovies(keyword);
  });
};

export const onClickLogo = () => {
  executeEventListener($("#logo"), "click", async () => {
    resetMoviesAndPages();
    movieApi.last_keyword = "";

    await movieApi.showPopularMovies();
  });
};
