import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import { movies } from "../../domain/movies";
import Store from "../../domain/Store";

const store: Store = Store.getInstance();

export const onSubmitSearchBox = () => {
  executeEventListener($(".search-box"), {
    type: "submit",
    prevent: true
  }, (event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));

    if (keyword === "") return;

    store.resetMoviesAndPages();
    store.setLastKeyword(keyword);

    movies.showSearchedMovies(keyword);
  });
};

export const onClickLogo = () => {
  executeEventListener($("#logo"), {
    type: "click",
    prevent: true
  }, () => {
    store.resetMoviesAndPages();
    store.setLastKeyword("");

    movies.showPopularMovies();
  });
};
