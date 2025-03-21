import APIHandler from "../ApiHandler";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

class MovieService {
  currentPage: number;
  baseUrl: string;

  constructor() {
    this.currentPage = 1;
    this.baseUrl = import.meta.env.VITE_REQUEST_URL;
  }

  async getPopularMovies() {
    const movies = await APIHandler.get(
      `/movie/popular?language=ko-KR&page=${this.currentPage}`
    );
    return movies;
  }

  async getSearchResult(searchWord: string) {
    const searchResult = await APIHandler.get(
      `/search/movie?query=${searchWord}&include_adult=false&language=ko-KR&page=${this.currentPage}`
    );
    return searchResult;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default MovieService;
