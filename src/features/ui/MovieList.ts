import MovieCard from "./MovieCard.ts";
import MovieSkeleton from "./MovieSkeleton.ts";
import { Movie } from "../../../types/types";
import noSearchImg from "../../images/Nosearch.png";

export default class MovieList {
  movieList: Element | null;
  movieContainer: Element | null;

  constructor() {
    this.movieList = document.querySelector(".thumbnail-list");
    this.movieContainer = document.querySelector(".main-result");
  }

  showEmpty() {
    this.movieContainer!.innerHTML = `
      <div class="result-none">
        <img src="${noSearchImg}" alt="검색 결과 없음" class="result-none-image" />
        <p class="result-none-text">검색 결과가 없습니다.</p>
      </div>
    `;
  }

  clearList() {
    this.movieList!.innerHTML = "";
    this.movieContainer!.innerHTML = "";
  }

  renderSkeleton() {
    this.clearList();
    for (let i = 0; i < 20; i++) {
      const li = document.createElement("li");
      const skeleton = new MovieSkeleton();
      li.innerHTML = skeleton.render();
      this.movieList?.append(li);
    }
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

export const movieListView = new MovieList();
