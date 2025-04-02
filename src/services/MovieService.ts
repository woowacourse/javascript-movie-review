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

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default MovieService;
