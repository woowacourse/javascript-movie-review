import { ApiMovies, ApiMovieItem, Movie } from "../type/movieType";
import { popularUrl, request, searchUrl } from "../util/api";

class MovieManager {
  #movies: Movie[] = [];
  #totalPages: number = 0;
  #page: number = 1;
  #searchWord: string = "";

  constructor() {
    if (this.#movies.length === 0) {
    }
    // 인기도 함수 호츌~~~
  }

  updateMoviesInfo(results: ApiMovieItem[]) {
    this.#movies = results.map((result: ApiMovieItem) => {
      return {
        title: result.title,
        src: result.poster_path,
        starRate: result.vote_average,
      };
    });
    console.log(this.#movies, this.#totalPages, this.#searchWord, this.#page);
  }

  async getMovies(query: string = "") {
    this.#page = 1;
    this.#searchWord = query;

    const url = query ? searchUrl(query, this.#page) : popularUrl(this.#page);
    const data = await request(url);
    this.#totalPages = data.total_pages;

    this.updateMoviesInfo(data.results);
  }

  async getMoreMovies() {
    this.increasePage();
    const url = searchUrl(this.#searchWord, this.#page);
    const data = await request(url);

    this.updateMoviesInfo(data);
  }

  increasePage() {
    this.#page += 1;
  }
}

export default new MovieManager();
