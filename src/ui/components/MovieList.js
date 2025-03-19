import Movie from "../../domain/models/Movie.ts";
import MovieCard from "./Movie.js";

export default class MovieList {
  constructor(containerSelector, moviesData, currentPage, totalPage) {
    this.container = document.querySelector(containerSelector);
    this.moviesData = moviesData;
  }

  init() {}

  loadInitMovie() {
    this.moviesData.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      console.log(movieCard);
      this.container.appendChild(movieCard.render());
    });
  }

  addLoadMoreButton() {}

  async loadMoreMovies() {}
}
