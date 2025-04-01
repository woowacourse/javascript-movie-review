import { createElement } from "../../util/dom";
export default function Fallback(text) {
  const $div = createElement("div", {
    className: "fallback-div",
    id: "fallback-div",
  });
  $div.innerHTML = `
      <img src="./images/fallback_no_movies.png" alt="머리 아픈 행성이" />
      <h1 class="title">${text}</h1>
  `;

  return $div;
}
