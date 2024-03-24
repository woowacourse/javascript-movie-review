import {
  ENTER_KEYCODE,
  SEARCH_BUTTON_TEXT,
  SEARCH_LABEL_TEXT,
  TITLE_TEXT,
} from "../constants/system";
import { dataStateStore } from "../model";
import { handleGetSearchMovieData } from "../service/handleSkeletonAndAPI";
import { createElementWithAttribute, debounceFunc } from "../utils";

import ItemView from "./ItemView";

// SearchBox event ----
const searchMovie = async () => {
  const $searchInput = document.querySelector("#search-input");
  if (!($searchInput instanceof HTMLInputElement)) return;
  const title = $searchInput.value;

  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();
  await handleGetSearchMovieData(title, true);
  ItemView(TITLE_TEXT.SEARCH(title), dataStateStore.movieData, "search");
};

const handleInputKeydown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode || event.which;
  const { target } = event;

  if (!(target instanceof HTMLInputElement)) return;

  if (keyCode === ENTER_KEYCODE) {
    debounceFunc(() => searchMovie());
  }
};

//--- SearchBox event
// make SearchBox ---
const Label = () => {
  const $label = createElementWithAttribute("label", {
    forId: "search-input",
    class: "screen-only",
  });
  $label.textContent = SEARCH_LABEL_TEXT;

  return $label;
};

const Input = () => {
  const $input = createElementWithAttribute("input", {
    id: "search-input",
    type: "text",
    placeholder: "검색",
  });
  if ($input instanceof HTMLInputElement) {
    $input.addEventListener("keydown", handleInputKeydown);
  }

  return $input;
};

const InputBox = () => {
  const $div = document.createElement("div");

  $div.appendChild(Label());
  $div.appendChild(Input());

  return $div;
};

const Button = () => {
  const $button = createElementWithAttribute("button", {
    class: "search-button",
  });
  $button.textContent = SEARCH_BUTTON_TEXT;
  $button.addEventListener("click", (event) => {
    event.stopPropagation();
    debounceFunc(() => searchMovie());
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
