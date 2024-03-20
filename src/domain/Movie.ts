import httpRequest from '../api/httpRequest';
import { MovieListType, MovieType } from '../types/movie';

// interface a {
//   movieList: MovieListType;
//   isLastPage: boolean;
// }

interface MovieData {
  movieList: MovieListType;
  isLastPage: boolean;
}
class Movie {
  #page: number;

  // #movieList: MovieListType = [];

  constructor() {
    this.#page = 0;
  }

  // TODO : 리팩터링
  // async getMovieData() {
  //   this.updatePage();

  //   const movieList = await httpRequest
  //     .fetchPopularMovies(this.#page)
  //     .then(({ popularMovieList, isLastPage }) => {
  //       const popularMovie = popularMovieList.map((movie: MovieType) => ({
  //         id: movie.id,
  //         poster_path: movie.poster_path,
  //         title: movie.title,
  //         vote_average: movie.vote_average,
  //       }));
  //       return { popularMovie, isLastPage };
  //     })
  //     .catch((error) => console.error(error));
  //   console.log(movieList);
  //   return movieList;
  // }

  async getMovieData(): Promise<MovieData> {
    this.updatePage();

    const { popularMovieList, isLastPage } = await httpRequest.fetchPopularMovies(this.#page);

    const movieList = popularMovieList.map((movie: MovieType) => ({
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      vote_average: movie.vote_average,
    }));

    return { movieList, isLastPage };
  }

  handleMovieData(type: string, input?: string) {
    if (type === 'popular') {
      return this.getMovieData();
    }

    return this.getSearchedData(input ?? '');
  }

  async getSearchedData(input: string) {
    this.updatePage();

    const movieList = await httpRequest
      .fetchSearchedMovies(this.#page, input)
      .then(({ searchedMovieList, isLastPage }) => ({
        movieList: searchedMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
        isLastPage,
      }))
      .catch((error) => {
        console.error(error);
        return { movieList: [], isLastPage: false };
      });
    return movieList;
  }

  updatePage() {
    this.#page += 1;
  }
}

export default Movie;
