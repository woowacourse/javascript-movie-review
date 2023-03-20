import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import { page } from "../domain/page";
import { resetMoviesAndPages } from "../domain/movieApi";

export const onSubmitSearchBox = () => {
  executeEventListener($(".search-box"), {
    type: "submit",
    prevent: true
  }, (event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));

    if (keyword === "") return;

    page.last_keyword = keyword;
    resetMoviesAndPages();
    page.showSearchedMovies(keyword);
  });
};

export const onClickLogo = () => {
  executeEventListener($("#logo"), {
    type: "click",
    prevent: true
  }, () => {
    resetMoviesAndPages();
    page.last_keyword = "";

    page.showPopularMovies();
  });
};
