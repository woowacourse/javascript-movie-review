import type { RateDetail, MovieDetailInterface } from '../domain/Movie/MovieDetail/MovieDetail.type';

const MovieStorage = {
  get(id: number) {
    return JSON.parse(localStorage.getItem(String(id)) ?? '{}');
  },

  setMovieRating({ id, title }: Pick<MovieDetailInterface, 'id' | 'title'>) {
    if (!this.get(id)) {
      localStorage.setItem(String(id), JSON.stringify({ title, ratingScore: 0 }));
    }
  },

  setMovieRatingWithScore({ id, title, ratingScore }: RateDetail & Pick<MovieDetailInterface, 'id' | 'title'>) {
    localStorage.setItem(String(id), JSON.stringify({ title, ratingScore }));
  },
};

export default MovieStorage;
