import { BaseResponse } from '../../apis/common/apiSchema.type';
import MovieAPI from '../../apis/movie/movie';
import { MovieListCardProps } from '../../components/MovieListCard/MovieListCard.type';

class Movie {
  static MAX_PAGE = 5;

  constructor(private page: number, private movieType: string) {
    this.page = 0;
    this.movieType = movieType;
  }

  setPage(pageValue: number) {
    this.page += pageValue;
  }

  isMaxPage() {
    return this.page === Movie.MAX_PAGE;
  }

  fetchMovieDetails({
    onSuccess,
    onError,
  }: {
    onSuccess: (data: BaseResponse<MovieListCardProps[]> | undefined) => void;
    onError: (error: Error | unknown) => void;
  }) {
    MovieAPI.fetchMovieDetails<BaseResponse<MovieListCardProps[]>>(this.page, this.movieType)
      .then(onSuccess)
      .catch(onError);
  }
}

export default Movie;
