import { ApiMovieItem, MovieAppData } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class Movie {
  private state: MovieAppData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
    isShowMore: false,
  };

  formMovies(apiData: ApiMovieItem[]) {
    return apiData.map((result: ApiMovieItem) => {
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
    this.state.movies = this.formMovies(apiData.results);

    this.state.totalPages = apiData.total_pages;

    return this.state;
  }

  async getMoreMovies() {
    this.state.page += 1;
    this.state.isShowMore = true;

    const url = this.makeUrl();
    const apiData = await request(url);
    const moreMovies = this.formMovies(apiData.results);
    this.state.movies = [...this.state.movies, ...moreMovies];

    return { ...this.state, movies: moreMovies };
  }

  makeUrl() {
    return this.state.searchWord
      ? searchUrl(this.state.searchWord, this.state.page)
      : popularUrl(this.state.page);
  }
}

export default new Movie();
