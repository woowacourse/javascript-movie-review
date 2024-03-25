import MovieAPI from '../../../apis/movie/movie';
import { MovieDetailResponse } from './MovieDetail.type';

class MovieDetail {
  fetchMovieDetail(
    id: string,
    {
      onSuccess,
      onError,
    }: {
      onSuccess: (movieDetail: MovieDetailResponse) => void;
      onError: (error: Error | unknown) => void;
    },
  ) {
    MovieAPI.fetchMovieDetail(id).then(onSuccess).catch(onError);
  }
}

export default MovieDetail;
