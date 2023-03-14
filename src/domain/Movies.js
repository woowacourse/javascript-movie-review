import { getApiPopularMovie } from './api';

export default class Movies {
  constructor() {
    this.setMovies();
  }

  async setMovies() {
    const popularMovies = await getApiPopularMovie();
    const refineMovies = popularMovies.results.map((movie) => {
      const { id, poster_path, title, vote_average } = movie;
      return { id, poster_path, title, vote_average };
    });

    return refineMovies;
  }
}
