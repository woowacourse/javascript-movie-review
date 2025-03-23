import Movie from "../../domain/models/Movie.ts";
import MovieCard from "./MovieCard.js";
import CustomButton from "./CustomButton.js";
import { ADD_MOVIE_BUTTON } from "../../shared/CustomButton.ts";
import NoResultsMessage from "./NoResultsMessage.js";

export default class MovieList {
  constructor(
    containerSelector,
    moviesData,
    currentPage,
    totalPage,
    movieService,
  ) {
    this.container = document.querySelector(containerSelector);
    this.moviesData = moviesData;
    this.movieService = movieService;
    this.currentPage = currentPage;
    this.totalPage = totalPage;
  }

  init() {
    this.loadInitMovie();
    this.addLoadMoreButton();
  }

  loadInitMovie() {
    const noResultsItem = document.querySelector(".no-results");
    if (noResultsItem) {
      noResultsItem.remove();
    }

    if (!this.moviesData || this.moviesData.length === 0) {
      const section = document.querySelector(".movie-select");
      const noResultsItem = new NoResultsMessage();
      section.appendChild(noResultsItem.render());
      return;
    }

    Array.from({ length: this.moviesData.length }).forEach(() => {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      this.container.appendChild(skeletonCard);
    });

    this.container.innerHTML = "";

    this.moviesData.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      this.container.appendChild(movieCard.render());
    });
  }

  addLoadMoreButton() {
    const existingButton = document.querySelector(".add-movie");
    existingButton?.remove();

    // 마지막 페이지면 버튼을 추가하지 않음
    if (this.currentPage >= this.totalPage) {
      return;
    }

    const loadMoreButton = new CustomButton(ADD_MOVIE_BUTTON);
    const section = document.querySelector("section");
    section.appendChild(loadMoreButton.render());
  }

  static removeMovieList() {
    const movieList = document.querySelector(".thumbnail-list");
    movieList.textContent = "";
  }

  updateMovieListTitle(query) {
    this.resetPageNumber();
    const movieListTitle = document.querySelector(".movie-list-title");
    if (query) {
      movieListTitle.textContent = `"${query}" 검색 결과`;
      return;
    }
    movieListTitle.textContent = "지금 인기 있는 영화";
  }

  addPageNumber() {
    this.currentPage += 1;
  }

  resetPageNumber() {
    this.currentPage = 1;
  }
}
