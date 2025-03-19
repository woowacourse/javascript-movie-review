import { createElement } from "../../util/dom";
export default function Header() {
  const $div = createElement("div", { className: "header-container" });
  const $header = createElement("header", { className: "header" });
  const $h1 = createElement("h1", { className: "logo" });
  const $img = createElement("img", {
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

  $searchButton.appendChild($searchImg);

  const $input = createElement("input", {
    type: "text",
    name: "search-bar",
    className: "search-bar",
    placeholder: "검색어를 입력하세요",
  });

  $form.append($input, $searchButton);

  $h1.appendChild($img);
  $header.append($h1, $form);

  $div.appendChild($header);

  return $div;
}
