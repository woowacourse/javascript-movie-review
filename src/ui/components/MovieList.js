import Movie from "../../domain/models/Movie.ts";
import MovieCard from "./Movie.js";
import CustomButton from "./CustomButton.js";
import { ADD_MOVIE_BUTTON } from "../../shared/CustomButton.ts";

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
      const noResultsItem = document.createElement("div");
      noResultsItem.classList.add("no-results");
      noResultsItem.innerHTML = `
        <img src="./images/aaaahangsung.png" alt="no results" class="no-results-image">
        <p class="no-results-text">검색 결과가 없습니다</p>
      `;
      section.appendChild(noResultsItem);
      return;
    }

    const skeletonCards = [];
    for (let i = 0; i < this.moviesData.length; i++) {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      skeletonCards.push(skeletonCard);
      this.container.appendChild(skeletonCard);
    }

    setTimeout(() => {
      this.container.innerHTML = "";

      this.moviesData.forEach((movieData) => {
        const movie = new Movie(movieData);
        const movieCard = new MovieCard(movie);
        this.container.appendChild(movieCard.render());
      });
    }, 1000);
  }

  addLoadMoreButton() {
    // 기존 버튼이 있다면 제거
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
