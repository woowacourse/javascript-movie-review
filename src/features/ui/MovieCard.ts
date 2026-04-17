import { Movie } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/image";
import starImg from "../../images/star_empty.png";

export default class MovieCard {
  movie: Movie;

  constructor(movie: Movie) {
    this.movie = movie;
  }

  render(): string {
    const src = this.movie.poster_path ? `${THUMB_NAIL_URL}${this.movie.poster_path}` : "";
    return `<div class="item" data-id="${this.movie.id}">
      <img
         class="thumbnail"
         src="${src}"
         alt="${this.movie.title}"
         loading="lazy"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="${starImg}" class="star" />
            <span>${(this.movie.vote_average ?? 0).toFixed(1)}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;
  }
}
