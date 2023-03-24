import MovieBoss from "../../domain/MovieBoss";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItem extends CustomElement {
  template() {
    const title = this.getAttribute("title");
    const voteAverage = this.getAttribute("vote_average");
    const img = this.getAttribute("src");
    const src =
      img === "null"
        ? "./image/noImg.jpeg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${img}`;

    return `
      <div class="item-card">
        <img
          class="item-thumbnail skeleton"
          loading="lazy"
          src= ${src}
          alt=${title}
        />
        <p class="item-title">${title}</p>
        <p class="item-score">
        <img src="./image/star_filled.png" alt="별점" />
        ${voteAverage}
        </p>
      </div>
  `;
  }

  setEvent() {
    const image = $(".item-thumbnail");
    image.addEventListener("load", () => {
      image.classList.remove("skeleton");
    });

    this.addEventListener("click", () => {
      const id = this.getAttribute("id");
      MovieBoss.deliverMoviesModal(id);
    });
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
