import dataStateStore from "../model/DataStateStore";
import createElementWithAttribute from "../utils/createElementWithAttribute";
import preventXSS from "../utils/preventXSS";

import ItemView from "./ItemView";

const searchMovie = () => {
  const $searchInput = document.querySelector("#search-input");
  if (!($searchInput instanceof HTMLInputElement)) return;

  const title = preventXSS($searchInput.value);
  // TODO : 관련 기능 유틸로 빼기
  const $itemView = document.querySelector(".item-view");
  $itemView?.remove();
  ItemView(`"${title}" 검색 결과`, dataStateStore.getFilteredMovieData(title));
};

const handleInputKeydown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode || event.which;
  const { target } = event;

  if (!(target instanceof HTMLInputElement)) return;

  if (keyCode === 13) {
    searchMovie();
  }
};

// TODO: input 관련 label 넣을 지 여부
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

const Button = () => {
  const $button = createElementWithAttribute("button", {
    class: "search-button",
  });
  $button.textContent = "검색";
  $button.addEventListener("click", (event) => {
    event.stopPropagation();
    searchMovie();
  });

  return $button;
};

const SearchBox = () => {
  const $searchBox = createElementWithAttribute("div", {
    class: "search-box",
  });
  $searchBox.appendChild(Input());
  $searchBox.appendChild(Button());

  return $searchBox;
};
export default SearchBox;
