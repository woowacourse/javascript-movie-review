import Movie from "../../domain/models/Movie.ts";
import MovieCard from "./Movie.js";
import CustomButton from './CustomButton.js';
import { ADD_MOVIE_BUTTON } from "../../shared/CustomButton.ts";

export default class MovieList {
  constructor(containerSelector, moviesData, currentPage, totalPage, movieService) {
    this.container = document.querySelector(containerSelector);
    this.moviesData = moviesData;
    this.movieService = movieService;
    this.currentPage = currentPage;
    this.totalPage = totalPage;
  }

  init() {
    this.loadInitMovie();
    this.addLoadMoreButton();
    this.handleMoreClickButton();
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
    const section = document.querySelector('section');
    section.appendChild(loadMoreButton.render());
  }

  handleMoreClickButton() {
    const loadMoreButton = document.querySelector('.add-movie');
    loadMoreButton.addEventListener('click', async () => {
      const pageNumber = this.currentPage + 1;
      await this.loadMoreMovies(pageNumber);
    })
  }

  async loadMoreMovies(pageNumber) {
    const newMoviesData = await this.movieService.getPopularResults(pageNumber);
    newMoviesData.movies.forEach((newMovieData) => {
      const movie = new Movie(newMovieData);
      const movieCard = new MovieCard(movie);
      this.container.appendChild(movieCard.render());
    });
  }
}
