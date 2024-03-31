import MovieAPI from '../../apis/movie/movie';
import { MOVIE } from '../../constants/Condition';
import { BaseResponse } from '../../apis/common/apiSchema.type';
import { IMovie, IMovieDetail, fetchMoviesProps, fetchMovieDetailProps } from './Movie.type';

const MovieService = {
  isMaxPage(page: number) {
    return page === MOVIE.MAX_PAGE;
  },

  async fetchMovieDetail({ key, onSuccess, onError }: fetchMovieDetailProps) {
    try {
      const response: IMovieDetail = await MovieAPI.fetchMovieDetail(key);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  },

  async fetchMovies({ movieType, page, onSuccess, onError }: fetchMoviesProps) {
    try {
      const response: BaseResponse<IMovie[]> =
        movieType === 'popular'
          ? await MovieAPI.fetchPopularMovies(page)
          : await MovieAPI.fetchSearchMovies(page, movieType);

      onSuccess(response.results);
    } catch (error) {
      onError(error);
    }
  },
};

export default MovieService;
