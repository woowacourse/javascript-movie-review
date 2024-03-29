import {
  ENTER_KEYCODE,
  SEARCH_BUTTON_TEXT,
  SEARCH_LABEL_TEXT,
  TITLE_TEXT,
} from "../constants/system";
import { movieDataStateStore } from "../model";
import { handleGetSearchMovieData } from "../service/handleSkeletonAndAPI";
import { createElementWithAttribute, debounceFunc } from "../utils";
import removePrevItemView from "../utils/removePrevItemView";

import renderItemView from "./ItemView";

const changeSearchMode = () => {
  const $logoImg = document.querySelector(".logo");
  const $searchBox = document.querySelector(".search-box");
  const $searchBoxMobile = document.querySelector(".search-box-mobile");

  $logoImg?.classList.toggle("hide");
  $searchBox?.classList.toggle("show");
  $searchBoxMobile?.classList.toggle("none");
};

const initSearchBox = () => {
  removePrevItemView();
  changeSearchMode();
};

// SearchBox event ----
const searchMovie = async () => {
  const $searchInput = document.querySelector("#search-input");
  if (!($searchInput instanceof HTMLInputElement)) return;
  initSearchBox();

  $searchInput.value = "";
  await handleGetSearchMovieData($searchInput.value, true);

  renderItemView({
    titleText: TITLE_TEXT.SEARCH($searchInput.value),
    movieData: movieDataStateStore.totalMovieData,
    listType: "search",
  });
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

const ButtonMobile = () => {
  const $button = createElementWithAttribute("button", {
    class: "search-button",
  });
  $button.textContent = SEARCH_BUTTON_TEXT;
  $button.addEventListener("click", (event) => {
    event.stopPropagation();
    changeSearchMode();
  });

  return $button;
};

export const SearchBox = () => {
  const $searchBox = createElementWithAttribute("div", {
    class: "search-box",
  });
  $searchBox.appendChild(InputBox());
  $searchBox.appendChild(Button());

  return $searchBox;
};

export const SearchBoxMobile = () => {
  const $searchBoxMobile = createElementWithAttribute("div", {
    class: "search-box-mobile",
  });
  $searchBoxMobile.appendChild(ButtonMobile());

  return $searchBoxMobile;
};
