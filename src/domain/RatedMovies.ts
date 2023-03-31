import type { RatedMovie } from '../types/domain';

const DEFAULT_RATING: RatedMovie = {
  id: -1,
  score: '0',
  desc: '별점 매기기',
};

class RatedMovies {
  #list: RatedMovie[];

  constructor(movies: RatedMovie[]) {
    this.#list = movies;
  }

  getList() {
    return this.#list;
  }

  update(newMovie: RatedMovie) {
    const isInclude = this.find(newMovie.id) !== DEFAULT_RATING;

    if (!isInclude) {
      this.add(newMovie);
      return;
    }

    this.#list = this.#list.map((movie) => (movie.id === newMovie.id ? { ...movie, score: newMovie.score, desc: newMovie.desc } : movie));
  }

  add(newMovie: RatedMovie) {
    this.#list = [...this.#list, newMovie];
  }

  find(targetId: number) {
    const targetMovie = this.#list.find((movie) => movie.id === targetId);

    if (!targetMovie) return DEFAULT_RATING;

    return targetMovie;
  }
}

export default RatedMovies;
