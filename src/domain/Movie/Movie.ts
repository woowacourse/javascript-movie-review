import MovieFetcher from '../../apis/MovieFetcher/MovieFetcher';

import { BaseResponse } from '../../apis/common/ApiClient/ApiClient.type';
import { MovieInterface, MovieResponse } from './Movie.type';

import MovieStorage from '../../storages/MovieStorage';

class Movie {
  static MAX_PAGE = 5;
  static MAX_MOVIE_ITEMS = 20;

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

  isMaxMovieItems(movieItems: MovieInterface[]) {
    return movieItems.length === Movie.MAX_MOVIE_ITEMS;
  }

  isEmptyMovieItems(movieItems: MovieInterface[]) {
    return movieItems.length === 0;
  }

  fetchMovieDetails({
    onSuccess,
    onError,
  }: {
    onSuccess: (data: MovieInterface[]) => void;
    onError: (error: Error | unknown) => void;
  }) {
    MovieFetcher.fetchMovieDetails(this.page, this.movieType)
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
