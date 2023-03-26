import { Movie } from './movies.type';

class Store {
  movieList: Movie[] = [];

  genreList = new Map<number, string>();

  initializeList() {
    this.movieList = [];
  }

  setMovies(movies: Movie[]) {
    this.movieList = [...this.movieList, ...movies];
  }

  getMovie(id: number): Movie {
    return this.movieList.find((movie) => movie.id === id)!;
  }

  setGenres(id: number, name: string) {
    this.genreList.set(id, name);
  }

  getGenres(id: number) {
    return this.genreList.get(id);
  }
}

export default new Store();
