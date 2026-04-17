import { Movie } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";
import starImg from "../../images/star_empty.png";

export default class MovieCard {
  movie: Movie;

  constructor(movie: Movie) {
    this.movie = movie;
  }

  render(): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "movie-card";
    li.dataset.id = this.movie.id.toString();
    li.innerHTML = `<div class="item">
      <img
         class="thumbnail"
         src="${THUMB_NAIL_URL}${this.movie.poster_path}"
         alt="${this.movie.title}"
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
    return li;
  }
}
