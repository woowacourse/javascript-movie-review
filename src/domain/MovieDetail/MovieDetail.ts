import MovieAPI from '../../apis/movie/movie';
import type { MovieDetailInterface, MovieDetailResponse, RateDetail } from './MovieDetail.type';

import MovieStorage from '../../storages/MovieStorage';

class MovieDetail {
  static fetchMovieDetail(
    id: string,
    {
      onSuccess,
      onError,
    }: {
      onSuccess: (movieDetail: MovieDetailInterface & RateDetail) => void;
      onError: (error: Error | unknown) => void;
    },
  ) {
    MovieAPI.fetchMovieDetail(id)
      .then((data: MovieDetailResponse) => {
        onSuccess({
          ...data,
          image: data.poster_path,
          score: data.vote_average,
          genres: data.genres.map(({ name }) => name).join(', '),
          ratingScore: this.getRatingScore(id),
        });
      })
      .catch(onError);
  }

  private static getRatingScore(id: string) {
    const ratingDetail = MovieStorage.getMovieRating(Number(id));

    return ratingDetail?.ratingScore ?? 0;
  }

  static updateRatingScore({ id, title, ratingScore }: RateDetail & Pick<MovieDetailInterface, 'id'>) {
    MovieStorage.setMovieRatingWithScore({ id, title: title ?? '', ratingScore });
  }
}

export default MovieDetail;
