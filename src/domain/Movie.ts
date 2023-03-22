import { ApiMovieItem, MovieAppData, MovieItem } from "../type/movieType";
import { request } from "../util/apiRequest";
import { popularMovieUrl, searchMovieUrl } from "./movieUrl";
import GenreMatcher from "./GenreMatcher";

class Movie {
  private state: MovieAppData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
    isShowMore: false,
  };

  getMovie(id: number) {
    return this.state.movies.find((movie) => movie.id === id);
  }

  async getMovies(query: string = "") {
    this.state.page = 1;
    this.state.searchWord = query;
    this.state.isShowMore = false;

    const apiData = await this.getApiData();

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

    const apiData = await this.getApiData();

    if (apiData.error) {
      return apiData;
    }

    const moreMovies = this.formMovies(apiData.results);
    this.state.movies = [...this.state.movies, ...moreMovies];
    this.state.totalPages = apiData.total_pages;

    return { ...this.state, movies: moreMovies };
  }

  private formMovies(apiData: ApiMovieItem[]) {
    return apiData.map<MovieItem>((result: ApiMovieItem) => {
      const { id, title, poster_path, vote_average, genre_ids, overview } =
        result;

      const imgSrc =
        poster_path === "null"
          ? "./image/no_image.jpg"
          : `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`;

      return {
        id: id,
        title: title,
        src: imgSrc,
        starRate: Number(vote_average.toFixed(1)),
        genres: GenreMatcher.convert(genre_ids).join(", "),
        description: overview,
      };
    });
  }

  private makeUrl() {
    return this.state.searchWord
      ? searchMovieUrl(this.state.searchWord, this.state.page)
      : popularMovieUrl(this.state.page);
  }

  private async getApiData() {
    const url = this.makeUrl();
    const apiData = await request(url);
    return apiData;
  }
}

export default new Movie();
