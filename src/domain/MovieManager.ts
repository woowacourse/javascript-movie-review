import { ApiMovies, ApiMovieItem, Movie } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieManager {
  private movies: Movie[] = [];
  private totalPages: number = 0;
  private page: number = 1;
  private searchWord: string = "";

  constructor() {
    if (this.movies.length === 0) {
      this.getApiMoreMovies();
    }
  }

  toMovies(results: ApiMovieItem[]) {
    return results.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: result.vote_average,
      };
    });
  }

  increasePage() {
    this.page += 1;
  }

  isLastPage() {
    return this.page === this.totalPages;
  }

  async getApiMovies(query: string = "") {
    this.page = 1;
    this.searchWord = query;

    const url = query ? searchUrl(query, this.page) : popularUrl(this.page);
    const data = await request(url);
    this.totalPages = data.total_pages;

    this.movies = this.toMovies(data);
  }

  async getApiMoreMovies() {
    const url = searchUrl(this.searchWord, this.page);
    const data = await request(url);

    this.movies = [...this.movies, ...this.toMovies(data)];
  }
}

export default new MovieManager();
