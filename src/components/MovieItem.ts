import { StarFilled } from "../assets";
import { POSTER_BASE_URL } from "../constants";
import MovieList from "../domain/MovieList";
import { Movie } from "../types/movie";
import { $$ } from "../utils/domSelector";
import MovieModal from "./MovieModal";

const MovieItem = {
  render: (movie: Movie) => {
    return `
      <li>
        <a href="#">
          <div id="${movie.id}" class="item-card movie-item">
          ${
            movie.poster_path
              ? `<img
              class="item-thumbnail"
              src="${POSTER_BASE_URL}${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
            />`
              : `<div class="item-thumbnail placeholder-thumbnail"></div>`
          }
            <p class="item-title">${movie.title}</p>
            <p class="item-score"><img src="${StarFilled}" alt="별점" />${
      movie.vote_average
    }</p>
        </div>
      </a>
    </li>`;
  },

  bindClickEvent: () => {
    $$<HTMLDivElement>(".movie-item").forEach((movieItem: HTMLDivElement) => {
      movieItem.addEventListener("click", (event) => {
        event.preventDefault();
        MovieItem.onClickMovieItem(Number(movieItem.id));
      });
    });
  },

  onClickMovieItem: async (movieId: number) => {
    MovieList.setCurrentMovieId(movieId);
    MovieModal.loadMovieDetail();
  },
};

export default MovieItem;
