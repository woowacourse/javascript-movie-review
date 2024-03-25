import MovieAPI from '../../apis/movie/movie';

import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MovieInterface, MovieResponse } from './Movie.type';

import MovieStorage from '../../storages/MovieStorage';

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
    onSuccess: (data: MovieInterface[]) => void;
    onError: (error: Error | unknown) => void;
  }) {
    MovieAPI.fetchMovieDetails(this.page, this.movieType)
      .then((data: BaseResponse<MovieResponse[]>) => {
        this.updateMovieRatings(data.results);

        const movieResponse: MovieInterface[] = data.results.map((result) => ({
          ...result,
          image: result.poster_path,
          score: result.vote_average,
        }));

        onSuccess(movieResponse);
      })
      .catch(onError);
  }

  private updateMovieRatings(movies: MovieResponse[]) {
    movies.forEach(({ id, title }) => {
      MovieStorage.setMovieRating({ id, title });
    });
  }
}

export default Movie;
