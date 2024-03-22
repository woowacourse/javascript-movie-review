import { ENTER_KEYCODE } from "../constants/system";
import { dataStateStore } from "../model";
import DataFetcher from "../service/DataFetcher";
import { createElementWithAttribute, debouceFunc } from "../utils";

import Label from "./Label";
import ItemView from "./MovieListContainer";

// SearchBox event ----
const SearchHandler = {
  getSearchInputValue() {
    const $searchInput = document.querySelector("#search-input");
    if (!($searchInput instanceof HTMLInputElement)) return;
    const title = $searchInput.value;

    return title;
  },

  async searchMovie() {
    const title = this.getSearchInputValue();
    console.log(title);
    if (!title) return;

    await DataFetcher.handleGetSearchMovieData(title, true);

    document.querySelector(".movie-list-container")?.remove();
    ItemView(`"${title}" 검색 결과`, dataStateStore.movieData, "search");
  },

  handleInputKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) return;

    if (keyCode === ENTER_KEYCODE) {
      debouceFunc(() => SearchHandler.searchMovie()); // this를 통해 SearchHandler 내의 메서드를 호출
    }
  },
};
//--- SearchBox event
// make SearchBox ---
const Input = () => {
  const $input = createElementWithAttribute("input", {
    id: "search-input",
    type: "text",
    placeholder: "검색",
  });

  if ($input instanceof HTMLInputElement) {
    $input.addEventListener("keydown", SearchHandler.handleInputKeydown);
  }

  return $input;
};

const InputBox = () => {
  const $div = document.createElement("div");
  const $label = Label({
    forId: "search-input",
    textContent: "영화 검색",
    className: "screen-reader-only",
  });

  $div.appendChild($label);
  $div.appendChild(Input());

  return $div;
};

const Button = () => {
  const $button = createElementWithAttribute("button", {
    class: "search-button",
  });
  $button.textContent = "검색";

  $button.addEventListener("click", (event) => {
    event.stopPropagation();
    debouceFunc(() => SearchHandler.searchMovie());
  });

  return $button;
};

const SearchBox = () => {
  const $searchBox = createElementWithAttribute("div", {
    class: "search-box",
  });

  $searchBox.appendChild(InputBox());
  $searchBox.appendChild(Button());

  return $searchBox;
};

export default SearchBox;
