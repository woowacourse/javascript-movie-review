import { ApiMovieItem, Movie } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieModel {
  private movies: Movie[] = [];
  private searchWord: string = "";
  private page: number = 1;
  private totalPages: number = 0;

  getMovieList() {
    return this.movies;
  }

  toMovies(results: ApiMovieItem[]) {
    return results.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: Number(result.vote_average.toFixed(1)),
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

    const url = query
      ? searchUrl(this.searchWord, this.page)
      : popularUrl(this.page);
    const data = await request(url);
    this.totalPages = data.total_pages;

    this.movies = this.toMovies(data.results);
  }

  async getApiMoreMovies() {
    this.increasePage();

    const url = this.searchWord
      ? searchUrl(this.searchWord, this.page)
      : popularUrl(this.page);
    const data = await request(url);

    this.movies = this.toMovies(data.results);
  }
}

const MovieInstance = new MovieModel();
export default MovieInstance;
