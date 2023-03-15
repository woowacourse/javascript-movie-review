import { ApiMovies, ApiMovieItem, Movie } from "../type/movieType";
import { popularUrl, request } from "../util/api";

class MovieManager {
  #movies: Movie[] = [];
  #totalPage: number = 0;
  #page: number = 1;

  constructor() {
    if (this.#movies.length === 0) {
    }
    // 인기도 함수 호츌~~~
  }

  updateMoviesInfo(data: ApiMovies) {
    const { total_page, results } = data;

    this.#totalPage = total_page;
    this.#movies = results.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: result.vote_average,
      };
    });
  }

  async getPopular() {
    const url = popularUrl(this.#page);
    const data = await request(url);
    this.updateMoviesInfo(data);
    console.log(this.#movies);
  }
}

export default new MovieManager();
