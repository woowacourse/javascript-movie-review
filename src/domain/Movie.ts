import httpRequest from '../api/httpRequest';
import { MovieListType, MovieType } from '../types/movie';

class Movie {
  #page: number;

  #movieList: MovieListType = [];

  constructor() {
    this.#page = 0;
  }

  // TODO : 리팩터링
  async getMovieData() {
    this.updatePage();

    const movieList: MovieListType = await httpRequest
      .fetchPopularMovies(this.#page)
      .then((popularMovieList) =>
        popularMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
      )
      .catch((error) => console.error(error));
    this.#movieList.push(...movieList);
    return movieList;
  }

  handleMovieData(type: string, input?: string) {
    if (type === 'popular') {
      return this.getMovieData();
    }

    console.log('hi');
    return this.getSearchedData(input ?? '');
  }

  async getSearchedData(input: string) {
    this.updatePage();

    const movieList: MovieListType = await httpRequest
      .fetchSearchedMovies(this.#page, input)
      .then((searchedMovieList) =>
        searchedMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
      )
      .catch((error) => console.error(error));
    this.#movieList.push(...movieList);
    return movieList;
  }

  updatePage() {
    this.#page += 1;
  }
}

export default Movie;
