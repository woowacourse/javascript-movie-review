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

  async fetchMovieDetails() {
    const movieResponse: BaseResponse<MovieResponse[]> = await MovieFetcher.fetchMovieDetails(
      this.page,
      this.movieType,
    );

    this.updateMovieRatings(movieResponse.results);

    const movieItemDetails: MovieInterface[] = movieResponse.results.map((result) => ({
      ...result,
      image: result.poster_path,
      score: result.vote_average,
    }));

    return movieItemDetails;
  }

  private updateMovieRatings(movies: MovieResponse[]) {
    movies.forEach(({ id, title }) => {
      MovieStorage.setMovieRating({ id, title });
    });
  }
}

export default Movie;
