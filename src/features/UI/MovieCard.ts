import { Movie } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";
import starImg from "../../images/star_empty.png";

export default class MovieCard {
  movie: Movie;

  constructor(movie: Movie) {
    this.movie = movie;
  }

  render(): string {
    return `<div class="item">
      <img
         class="thumbnail"
         src="${THUMB_NAIL_URL}${this.movie.poster_path}"
         alt="${this.movie.title}"
        />
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
