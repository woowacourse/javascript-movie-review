import MovieAPI from '../../apis/movie/movie';
import { IMovie, IMovieDetail } from './Movie.type';
import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MOVIE } from '../../constants/Condition';

class MovieService {
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

  fetchMovieDetail({
    key,
    onSuccess,
    onError,
  }: {
    key: number;
    onSuccess: (data: IMovieDetail) => void;
    onError: (error: Error | unknown) => void;
  }) {
    MovieAPI.fetchMovieDetail(key).then(onSuccess).catch(onError);
  }

  fetchMovies({
    movieType,
    onSuccess,
    onError,
  }: {
    movieType: string;
    onSuccess: (data: IMovie[]) => void;
    onError: (error: Error | unknown) => void;
  }) {
    if (movieType === 'popular') {
      MovieAPI.fetchPopularMovies(this.page)
        .then((data: BaseResponse<IMovie[]>) => {
          onSuccess(data.results);
        })
        .catch(onError);
    } else {
      MovieAPI.fetchSearchMovies(this.page, movieType)
        .then((data: BaseResponse<IMovie[]>) => {
          onSuccess(data.results);
        })
        .catch(onError);
    }
  }
}

export default MovieService;
