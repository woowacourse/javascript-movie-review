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
    this.moviesData.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      this.container.appendChild(movieCard.render());
    });
  }

  addLoadMoreButton() {
    const loadMoreButton = new CustomButton(ADD_MOVIE_BUTTON);
    const section = document.querySelector("section");
    section.appendChild(loadMoreButton.render());
  }

  static removeMovieList() {
    const movieList = document.querySelector(".thumbnail-list");
    movieList.textContent = "";
  }
}
