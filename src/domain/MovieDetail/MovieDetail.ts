import MovieFetcher from '../../apis/MovieFetcher/MovieFetcher';
import type { MovieDetailInterface, MovieDetailResponse, RateDetail } from './MovieDetail.type';

import MovieStorage from '../../storages/MovieStorage';

class MovieDetail {
  static async fetchMovieDetail(id: string): Promise<MovieDetailInterface & Pick<RateDetail, 'ratingScore'>> {
    const movieDetailResponse: MovieDetailResponse = await MovieFetcher.fetchMovieDetail(id);

    return {
      ...movieDetailResponse,
      image: `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${movieDetailResponse.poster_path}`,
      score: movieDetailResponse.vote_average,
      genres: movieDetailResponse.genres.map(({ name }) => name).join(', '),
      ratingScore: this.getRatingScore(id),
    };
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
