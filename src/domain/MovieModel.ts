import { ApiMovieItem, ModelData } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieModel {
  private state: ModelData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
  };

  async getData() {
    return this.state;
  }

  formMovies(apiData: ApiMovieItem[]) {
    return apiData.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: Number(result.vote_average.toFixed(1)),
      };
    });
  }

  async getApiMovies(query: string = "") {
    this.state.page = 1;
    this.state.searchWord = query;

    const url = this.makeUrl();
    const apiData = await request(url);
    this.state.movies = this.formMovies(apiData.results);

    this.state.totalPages = apiData.total_pages;
  }

  async getApiMoreMovies() {
    this.state.page += 1;

    const url = this.makeUrl();
    const apiData = await request(url);

    this.state.movies = this.formMovies(apiData.results);
  }

  makeUrl() {
    return this.state.searchWord
      ? searchUrl(this.state.searchWord, this.state.page)
      : popularUrl(this.state.page);
  }
}

export default new MovieModel();
