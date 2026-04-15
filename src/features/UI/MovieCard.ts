import { Movie } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";
import starImg from "../../images/star_empty.png";

export default class MovieCard {
  movie: Movie;

  constructor(movie: Movie) {
    this.movie = movie;
  }

  render(): string {
    return /*html*/ `
      <div class="item" data-id=${this.movie.id}>
        <div class="thumbnail-wrapper">
          <div class="thumbnail-placeholder"></div>
          <img
            class="thumbnail"
            src="${THUMB_NAIL_URL}${this.movie.poster_path}"
            alt="${this.movie.title}"
            loading="lazy"
            onload="this.previousElementSibling?.classList.add('hidden'); this.classList.add('loaded')"
          />
        </div>
        <div class="item-desc">
          <p class="rate">
            <img src="${starImg}" class="star" />
            <span>${this.movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;
  }
}
