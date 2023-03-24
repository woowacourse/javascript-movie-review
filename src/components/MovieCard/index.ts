import { Movie } from "../../types";
import starImg from "../../assets/star_filled.png";

class MovieCard {
  static render(movie: Movie) {
    return /*html*/ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail skeleton"
              src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
            />
            <p class="item-title">${movie.title}</p>
            <p class="item-score"><img src="${starImg}" alt="별점" />${movie.vote_average}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export { MovieCard };
