import Movie from "../../domain/models/Movie.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";
import MovieCard from "../components/Movie.js";

export default class MovieListHandler {
  private movieList: MovieList;

  constructor(private movieService: MovieService) {}

  async initMovieList() {
    const moviesData = await this.movieService.getPopularResults();
    this.movieList = new MovieList(
      ".thumbnail-list",
      moviesData.movies,
      moviesData.page,
      moviesData.totalPages,
      this.movieService
    );
    this.movieList.init();
    this.handleMoreClickButton();
  }

  handleMoreClickButton() {
    const loadMoreButton = document.querySelector('.add-movie');
    if(!loadMoreButton)return ;
    loadMoreButton.addEventListener('click', async () => {
      const pageNumber = this.movieList.currentPage + 1;
      await this.handleLoadMore(pageNumber);
    })
  }

  async handleLoadMore(pageNumber: number) {
    const newMoviesData = await this.movieService.getPopularResults(pageNumber);
    newMoviesData.movies.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      this.movieList.container.appendChild(movieCard.render());
    });
  }
}
