import MovieModal from "./MovieModal";
import MovieList from "../domain/MovieList";
import { StarFilled } from "../assets";
import { POSTER_BASE_URL } from "../constants";
import { Movie } from "../types/movie";
import { $, $$ } from "../utils/domSelector";

const MovieItem = {
  render: (movie: Movie) => {
    return `
      <li>
          <div id="${movie.id}" class="item-card movie-item">
          ${
            movie.poster_path
              ? `<img
              class="item-thumbnail skeleton"
              src="${POSTER_BASE_URL}${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
              />`
              : `<div id="item-thumbnail" class="item-thumbnail placeholder-thumbnail skeleton"></div>`
          }
            <p id="item-title" class="item-title skeleton">${movie.title}</p>
            <p id="item-score" class="item-score skeleton"><img src="${StarFilled}" alt="별점" />${
      movie.vote_average
    }</p>
          </div>
      </li>
    `;
  },

  bindClickEvent: () => {
    $<HTMLUListElement>(".item-list").addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement) {
        const movieItem = event.target.closest("div");
        if (movieItem instanceof HTMLDivElement)
          MovieItem.onClickMovieItem(Number(movieItem.id));
      }
    });
  },

  onClickMovieItem: (movieId: number) => {
    MovieList.setCurrentMovieId(movieId);
    MovieModal.loadMovieDetail();
  },

  removeSkeleton: () => {
    $$<HTMLDivElement>(".item-card").forEach((item) => {
      item.childNodes.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.classList.remove("skeleton");
        }
      });
    });
  },
};

export default MovieItem;
