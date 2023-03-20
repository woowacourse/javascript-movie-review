import { ApiMovieItem, MovieAppData, MovieItem } from "../type/movieType";
import { request } from "../util/apiRequest";
import { popularMovieUrl, searchMovieUrl } from "./movieUrl";

class Movie {
  private state: MovieAppData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
    isShowMore: false,
  };

  formMovies(apiData: ApiMovieItem[]) {
    return apiData.map<MovieItem>((result: ApiMovieItem) => {
      return {
        id: result.id,
        title: result.title,
        src: result.poster_path,
        starRate: Number(result.vote_average.toFixed(1)),
      };
    });
  }

  async getMovies(query: string = "") {
    this.state.page = 1;
    this.state.searchWord = query;
    this.state.isShowMore = false;

    const url = this.makeUrl();
    const apiData = await request(url);

    if (apiData.error) {
      return apiData;
    }

    this.state.movies = this.formMovies(apiData.results);
    this.state.totalPages = apiData.total_pages;

    return this.state;
  }

  async getMoreMovies() {
    this.state.page += 1;
    this.state.isShowMore = true;

    const url = this.makeUrl();
    const apiData = await request(url);

    if (apiData.error) {
      return apiData;
    }

    const moreMovies = this.formMovies(apiData.results);
    this.state.movies = [...this.state.movies, ...moreMovies];
    this.state.totalPages = apiData.total_pages;

    return { ...this.state, movies: moreMovies };
  }

  makeUrl() {
    return this.state.searchWord
      ? searchMovieUrl(this.state.searchWord, this.state.page)
      : popularMovieUrl(this.state.page);
  }
}

export default new Movie();
