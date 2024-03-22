import MovieAPI from '../../apis/movie/movie';

import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MovieDetail } from './Movie.type';

import { MOVIE } from '../../constants/Condition';

class Movie {
  private page: number;

  constructor(private movieType: string) {
    this.page = 0;
    this.movieType = movieType;
  }

  setPage(pageValue: number) {
    this.page += pageValue;
  }

  isMaxPage() {
    return this.page === MOVIE.MAX_PAGE;
  }

  fetchMovieDetails({
    onSuccess,
    onError,
  }: {
    onSuccess: (data: BaseResponse<MovieDetail[]>) => void;
    onError: (error: Error | unknown) => void;
  }) {
    MovieAPI.fetchMovieDetails<BaseResponse<MovieDetail[]>>(this.page, this.movieType).then(onSuccess).catch(onError);
  }
}

export default Movie;
