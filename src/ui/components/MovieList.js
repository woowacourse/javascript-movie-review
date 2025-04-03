import Movie from "../../domain/models/Movie.ts";
import MovieCard from "./Movie.js";
import CustomButton from "./CustomButton.js";
import MovieModal from "./MovieModal.js";
import { ADD_MOVIE_BUTTON } from "../../constants/buttonFields.ts";

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
    this.setupDelegatedClickEvent();
  }

  setupDelegatedClickEvent() {
    if (!this.container) return;

    this.container.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li || !this.container.contains(li)) return;

      const movieId = li.dataset.movieId;
      if (!movieId) return;

      const movieData = this.moviesData.find(
        (m) => String(m.id) === movieId
      );
      if (!movieData) return;

      const movie = new Movie(movieData);
      const modal = new MovieModal(movie, this.movieService);
      modal.render();
    });
  }

  loadInitMovie() {
    this.removeNoResultItem();

    if (!this.moviesData || this.moviesData.length === 0) {
      this.renderNoResult()
      return;
    }

    this.renderSkeleton();
    setTimeout(() => this.renderMovies(), 1000);
  }

  removeNoResultItem() {
    const noResultsItem = document.querySelector(".no-results");
    if (noResultsItem) {
      noResultsItem.remove();
    }
  }

  renderNoResult() {
    const section = document.querySelector("section");
    const noResultsItem = document.createElement("div");
    noResultsItem.classList.add("no-results");
    noResultsItem.innerHTML = `
      <img src="./images/aaaahangsung.png" alt="no results" class="no-results-image">
      <p class="no-results-text">검색 결과가 없습니다</p>
    `;
    section.appendChild(noResultsItem);
  }

  renderSkeleton() {
    const skeletonCards = [];
    for (let i = 0; i < this.moviesData.length; i++) {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      skeletonCards.push(skeletonCard);
      this.container.appendChild(skeletonCard);
    }
  }

  renderMovies() {
    this.container.innerHTML = "";

    this.moviesData.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie, this.movieService);
      this.container.appendChild(movieCard.render());
    });
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
