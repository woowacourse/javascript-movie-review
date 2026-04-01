import { Movie } from "../../../types/types";
import { MovieSkeleton } from "./MovieSkeleton";

const THUMB_NAIL_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face/";

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
  movieContainer: Element | null;

  constructor() {
    this.movieList = document.querySelector(".thumbnail-list");
    this.movieContainer = document.querySelector(".main-result");
  }

  showEmpty() {
    this.movieContainer!.innerHTML = `
      <div class="result-none">
        <img src="../../../templates/images/Nosearch.png" alt="검색 결과 없음" class="result-none-image" />
        <p class="result-none-text">검색 결과가 없습니다.</p>
      </div>
    `;
  }

  renderSkeleton() {
    this.movieList!.innerHTML = "";
    for (let i = 0; i < 20; i++) {
      const li = document.createElement("li");
      const skeleton = new MovieSkeleton();
      li.innerHTML = skeleton.render();
      this.movieList?.append(li);
    }
  }

  renderMovieList(movies: { results: Movie[] }) {
    this.movieList!.innerHTML = "";
    movies.results.forEach((movie: Movie) => {
      const li: HTMLLIElement = document.createElement("li");
      const movieCard = new MovieCard(movie);
      li.innerHTML = movieCard.render();
      this.movieList?.append(li);
    });
  }
}

export default MovieList;
