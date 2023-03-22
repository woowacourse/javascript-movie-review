import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItem extends CustomElement {
  template() {
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("vote_average");
    const img =
      src === "null"
        ? "./image/noImg.jpeg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${src}`;

    return `
      <div class="item-card">
        <img
          class="item-thumbnail skeleton"
          loading="lazy"
          src= ${img}
          alt=${title}
        />
      <p class="item-title">${title}</p>
      <p class="item-score"><img src="./image/star_filled.png" alt="별점" />${voteAverage}</p>
      </div>
  `;
  }

  setEvent() {
    const image = $(".item-thumbnail");
    image.addEventListener("load", () => {
      image.classList.remove("skeleton");
    });
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
