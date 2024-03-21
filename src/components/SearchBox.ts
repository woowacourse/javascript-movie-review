import { dataStateStore } from "../model";
import { handleGetSearchMovieData } from "../service/handleSkeletonAndAPI";
import { createElementWithAttribute, debouceFunc } from "../utils";

import ItemView from "./ItemView";

// SearchBox event ----
const searchMovie = async () => {
  const $searchInput = document.querySelector("#search-input");
  if (!($searchInput instanceof HTMLInputElement)) return;
  const title = $searchInput.value;
  await handleGetSearchMovieData(title, true);
  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();

  ItemView(`"${title}" 검색 결과`, dataStateStore.movieData, "search");
};

const handleInputKeydown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode || event.which;
  const { target } = event;

  if (!(target instanceof HTMLInputElement)) return;

  if (keyCode === 13) {
    debouceFunc(() => searchMovie());
  }
};

//--- SearchBox event
// make SearchBox ---
const Label = () => {
  const $label = createElementWithAttribute("label", {
    forId: "search-input",
    class: "screen-only",
  });
  $label.textContent = "영화 검색";

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
  $button.textContent = "검색";
  $button.addEventListener("click", (event) => {
    event.stopPropagation();
    debouceFunc(() => searchMovie());
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
