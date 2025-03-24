import { IMG_PATH } from "../constants/constants";
import { Result } from "../types/movie";
import { getPopularityMovie } from "./getPopularityMovie";
import { searchMovie } from "./searchMovie";

class MovieManager {
  #movies: Result[] = [];
  #page: number = 1;
  #searchPage: number = 1;

  reset() {
    this.#movies = [];
    this.#page = 1;
    this.#searchPage = 1;
  }

  async fetchPopular() {
    const data = await getPopularityMovie(this.#page);
    if (!data) return { results: null };

    const results = this.parsingMovieInfo(data.results);
    this.#movies.push(...results);

    return {
      results: this.#movies,
      totalPage: data.total_pages,
      currentPage: this.#page++,
    };
  }

  async fetchSearch(keyword: string) {
    const data = await searchMovie(this.#searchPage, keyword);
    if (!data) return { results: null };

    const results = this.parsingMovieInfo(data.results);
    this.#movies.push(...results);

    return {
      results: this.#movies,
      totalPage: data.total_pages,
      currentPage: this.#searchPage++,
    };
  }

  parsingMovieInfo(movies: Result[]) {
    return movies.map((movie) => ({
      ...movie,
      poster_path: `${IMG_PATH}/w300${movie.poster_path}`,
      vote_average: parseFloat(movie.vote_average.toFixed(1)),
      backdrop_path: `${IMG_PATH}/w1280${movie.backdrop_path}`,
    }));
  }
}

export default MovieManager;
