import { URLS } from "../../setting/settings";
import { createElement } from "../../util/dom";
export default function MovieItem({ id, src, title, rate, onload }) {
  const $li = createElement("li", { id });
  let url = `${URLS.imgW500}${src}`;
  if (!src) url = "images/fallback.png";

  $li.innerHTML = `
      <div class="skeleton-thumbnail thumbnail"></div>
      <div class="item">
        <img
          class="thumbnail hide"
          src="${url}"
          alt="${title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span>${Number(rate).toFixed(1)}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
  `;

  if (onload) {
    const img = $li.querySelector("img.thumbnail");
    img.addEventListener("load", onload);
  }

  return $li;
}
