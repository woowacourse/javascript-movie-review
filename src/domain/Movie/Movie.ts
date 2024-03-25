import MovieAPI from '../../apis/movie/movie';

import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MovieDetail } from './Movie.type';

import { MOVIE } from '../../constants/Condition';

class Movie {
  private page: number;

  constructor() {
    this.page = 0;
  }

  setPage(pageValue: number) {
    this.page += pageValue;
  }

  isMaxPage() {
    return this.page === MOVIE.MAX_PAGE;
  }

  fetchMovieDetails({
    movieType,
    onSuccess,
    onError,
  }: {
    movieType: string;
    onSuccess: (data: BaseResponse<MovieDetail[]>) => void;
    onError: (error: Error | unknown) => void;
  }) {
    if (movieType === 'popular') {
      MovieAPI.fetchPopularMovieDetails(this.page).then(onSuccess).catch(onError);
    } else {
      MovieAPI.fetchSearchMovieDetails(this.page, movieType).then(onSuccess).catch(onError);
    }
  }
}

export default Movie;
