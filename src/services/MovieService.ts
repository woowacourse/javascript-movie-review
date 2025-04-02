import APIHandler from "../ApIHandler";

class MovieService {
  currentPage: number;

  constructor() {
    this.currentPage = 1;
  }

  async getPopularMovies() {
    const movies = await APIHandler.get(
      `/movie/popular?language=ko-KR&page=${this.currentPage}`
    );
    return movies;
  }

  async getMovieDetails(movieId: number) {
    const movieDetails = await APIHandler.get(
      `/movie/${movieId}?language=ko-KR`
    );
    return movieDetails;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default MovieService;
