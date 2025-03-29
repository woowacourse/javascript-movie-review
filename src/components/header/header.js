import { createElement } from "../../util/dom";
import redirectWithQuery from "../../service/redirectWithQuery";

export default function Header() {
  const $headerContainer = createElement("div", {
    className: "header-container",
  });

  const $header = createElement("header", { className: "header" });

  const $logo = createElement("h1", { className: "logo" });

  const $logoImg = createElement("img", {
    src: "./images/logo.png",
    alt: "MovieList",
  });

  const $form = createElement("form", {
    className: "input-form",
  });

  const $searchButton = createElement("button", {
    className: "search-btn",
  });

  const $searchImg = createElement("img", {
    src: "./images/Search.png",
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
    redirectWithQuery({
      path: "/search.html",
      query: { query: searchValue },
    });
  });

  $logo.addEventListener("click", () => {
    redirectWithQuery({
      path: "/index.html",
    });
  });

  $searchButton.appendChild($searchImg);
  $form.append($input, $searchButton);
  $logo.appendChild($logoImg);
  $header.append($logo, $form);
  $headerContainer.appendChild($header);

  return $headerContainer;
}
