import { ApiMovieItem, ModelData, Movie } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieModel {
  private data: ModelData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
  };

  async getData() {
    return this.data;
  }

  toMovies(apiData: ApiMovieItem[]) {
    return apiData.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: Number(result.vote_average.toFixed(1)),
      };
    });
  }

  increasePage() {
    this.data.page += 1;
  }

  isLastPage() {
    return this.data.page === this.data.totalPages;
  }

  async getApiMovies(query: string = "") {
    this.data.page = 1;
    this.data.searchWord = query;

    const url = query
      ? searchUrl(this.data.searchWord, this.data.page)
      : popularUrl(this.data.page);
    const data = await request(url);
    this.data.totalPages = data.total_pages;

    this.data.movies = this.toMovies(data.results);
  }

  async getApiMoreMovies() {
    this.increasePage();

    const url = this.data.searchWord
      ? searchUrl(this.data.searchWord, this.data.page)
      : popularUrl(this.data.page);
    const data = await request(url);

    this.data.movies = this.toMovies(data.results);
  }
}

export default new MovieModel();
