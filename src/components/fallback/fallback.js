import { createElement } from "../../util/dom";
export default function Fallback() {
  const $div = createElement("div", {
    className: "fallback-div",
    id: "fallback",
  });
  $div.innerHTML = `
      <img src="./images/fallback_no_movies.png" alt="머리 아픈 행성이" />
      <h1 class="title" id="fallback-details">검색 결과가 없습니다.</h1>
  `;

  return $div;
}
