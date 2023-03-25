import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";

const store: Store = Store.getInstance();

export const onSubmitSearchBox = () => {
  $(".search-box").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));

    if (keyword === "") return;

    store.resetMoviesAndPages();
    store.setLastKeyword(keyword);

    updateMovies(keyword);
  });
};

export const onClickLogo = () => {
  $("#logo").addEventListener("click", () => {
    store.resetMoviesAndPages();
    store.setLastKeyword("");

    updateMovies();
  })
};
