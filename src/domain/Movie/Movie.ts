import MovieAPI from '../../apis/movie/movie';
import { IMovie } from './Movie.type';
import { BaseResponse } from '../../apis/common/apiSchema.type';
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

  fetchMovies({
    movieType,
    onSuccess,
    onError,
  }: {
    movieType: string;
    onSuccess: (data: BaseResponse<IMovie[]>) => void;
    onError: (error: Error | unknown) => void;
  }) {
    if (movieType === 'popular') {
      MovieAPI.fetchPopularMovies(this.page).then(onSuccess).catch(onError);
    } else {
      MovieAPI.fetchSearchMovies(this.page, movieType).then(onSuccess).catch(onError);
    }
  }
}

export default Movie;
