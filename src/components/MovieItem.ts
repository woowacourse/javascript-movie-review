import { StarFilled } from "../assets";
import { POSTER_BASE_URL } from "../constants";
import { Movie } from "../types/movie";

const MovieItem = {
  render: (movie: Movie) => {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${POSTER_BASE_URL}${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
            />
            <p class="item-title">${movie.title}</p>
            <p class="item-score"><img src="${StarFilled}" alt="별점" />${movie.vote_average}</p>
          </div>
        </a>
      </li>`;
  },
};

export default MovieItem;
