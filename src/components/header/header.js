import { createElement } from "../../util/dom";
export default function Header() {
  const $div = createElement("div", { className: "header-container" });
  const $header = createElement("header", { className: "header" });
  const $h1 = createElement("h1", { className: "logo" });
  const $img = createElement("img", {
    src: "./images/logo.png",
    alt: "MovieList",
  });

  const $input = createElement("input", {
    type: "text",
    className: "search-bar",
    placeholder: "검색어를 입력하세요",
  });

  $h1.appendChild($img);
  $header.append($h1, $input);

  $div.appendChild($header);

  return $div;
}
