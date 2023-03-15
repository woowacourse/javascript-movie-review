import { ApiMovieItem, MoviesData } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieModel {
  private moviesData: MoviesData = {
    list: [],
    searchWord: "",
  };
  private page: number = 1;
  private totalPages: number = 0;

  async getMovieList() {
    return this.moviesData;
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
    this.moviesData.searchWord = query;

    const url = query ? searchUrl(query, this.page) : popularUrl(this.page);
    const data = await request(url);
    this.totalPages = data.total_pages;

    this.moviesData.list = this.toMovies(data.results);
  }

  async getApiMoreMovies() {
    const url = searchUrl(this.moviesData.searchWord, this.page);
    const data = await request(url);

    this.moviesData.list = [
      ...this.moviesData.list,
      ...this.toMovies(data.results),
    ];
  }
}

const MovieInstance = new MovieModel();
export default MovieInstance;
