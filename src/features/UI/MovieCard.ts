const THUMB_NAIL_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face/";

import { Movie } from "../../../types/types";

export class MovieCard {
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
            <img src="../../../templates/images/star_empty.png" class="star" />
            <span>${this.movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;
  }
}

class MovieList {
  movieList: Element | null;

  constructor() {
    this.movieList = document.querySelector(".thumbnail-list");
  }

  renderMovieList(movies: { results: Movie[] }) {
    movies.results.forEach((movie: Movie) => {
      const li: HTMLLIElement = document.createElement("li");
      const movieCard = new MovieCard(movie);
      li.innerHTML = movieCard.render();
      this.movieList?.append(li);
    });
  }
}

export default MovieList;
