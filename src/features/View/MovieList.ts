import MovieCard from "./MovieCard.ts";
import MovieSkeleton from "./MovieSkeleton.ts";
import { Movie } from "../../../types/types.ts";
import noSearchImg from "../../images/Nosearch.png";

export default class MovieList {
  movieList: Element | null;
  movieContainer: Element | null;

  constructor() {
    this.movieList = document.querySelector(".thumbnail-list");
    this.movieContainer = document.querySelector(".main-result");
  }

  renderMainTitle(title: string): void {
    const mainTitle = document.querySelector(".main-title") as HTMLElement;
    if (mainTitle) mainTitle.textContent = title;
  }

  updateMoreButton(totalPages: number, currentPage: number): void {
    const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
    if (!moreButton) return;
    moreButton.style.display = totalPages === currentPage ? "none" : "block";
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
      this.movieList?.append(new MovieSkeleton().render());
    }
  }

  renderMovieList(movies: { results: Movie[] }) {
    movies.results.forEach((movie: Movie) => {
      this.movieList?.append(new MovieCard(movie).render());
    });
  }
}
