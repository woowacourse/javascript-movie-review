import type { RateDetail, MovieDetailInterface } from '../domain/MovieDetail/MovieDetail.type';

const MovieStorage = {
  getMovieRating(id: number) {
    return JSON.parse(localStorage.getItem(String(id)) ?? '{}');
  },

  setMovieRating({ id, title }: Pick<MovieDetailInterface, 'id' | 'title'>) {
    if (!this.getMovieRating(id)) {
      localStorage.setItem(String(id), JSON.stringify({ title, ratingScore: 0 }));
    }
  },

  setMovieRatingWithScore({ id, title, ratingScore }: RateDetail & Pick<MovieDetailInterface, 'id' | 'title'>) {
    localStorage.setItem(String(id), JSON.stringify({ title, ratingScore }));
  },
};

export default MovieStorage;
