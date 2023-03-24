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

  add(movie: RatedMovie) {
    this.#list = [...this.#list, movie];
    console.log(this.#list);
  }

  find(targetId: number) {
    const targetMovie = this.#list.find((movie) => movie.id === targetId);

    if (!targetMovie) return DEFAULT_RATING;

    return targetMovie;
  }
}

export default RatedMovies;
