import { createElement } from "../../util/dom";
import handleSearch from "../../service/searchService.ts";
import { paths } from "../../setting/settings.ts";

export default function Header() {
  const $headerContainer = createElement("div", {
    className: "header-container",
  });

  const $header = createElement("header", { className: "header" });

  const $logo = createElement("h1", { className: "logo", id: "logo" });

  const $logoImg = createElement("img", {
    src: paths.logo,
    alt: "MovieList",
  });

  const $form = createElement("form", {
    className: "input-form",
  });

  const $searchButton = createElement("button", {
    className: "search-btn",
  });

  const $searchImg = createElement("img", {
    src: paths.search,
    alt: "돋보기",
  });

  const $input = createElement("input", {
    type: "text",
    name: "search-bar",
    className: "search-bar",
    placeholder: "검색어를 입력하세요",
  });

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search-bar");
    handleSearch(searchValue);
  });

  $logo.addEventListener("click", () => {
    location.reload();
  });

  $searchButton.appendChild($searchImg);
  $form.append($input, $searchButton);
  $logo.appendChild($logoImg);
  $header.append($logo, $form);
  $headerContainer.appendChild($header);

  return $headerContainer;
}
