import { API_URL, FETCH_SUCCESS, FETCH_FAIL, SYSTEM_CRASHED } from '../constants/constants';
import {
  MovieType,
  MovieResponseType,
  APIMovieType,
  APIMovieResponseType,
  FetchStatusType,
} from '../types';

class MovieFetcher {
  private currentPage = 1;
  private movieResponse: MovieResponseType = { result: FETCH_SUCCESS };

  resetPage() {
    this.currentPage = 1;
  }

  increasePage() {
    this.currentPage += 1;
  }

  async getMovieFetchResult(keyword?: string): Promise<MovieResponseType> {
    const response: APIMovieResponseType | undefined = await this.fetchMovieInfo(keyword);

    if (!response) return this.movieResponse;
    if (!response.results) return this.movieResponse;

    const totalPages = response.total_pages;
    const movieList = response.results.map(
      (rawMovie: APIMovieType): MovieType => ({
        title: rawMovie.title,
        posterPath: rawMovie.poster_path,
        voteAverage: rawMovie.vote_average,
      }),
    );

    this.movieResponse = { result: FETCH_SUCCESS, movieList };

    if (this.currentPage === totalPages) this.movieResponse.isLastPage = true;

    return this.movieResponse;
  }

  async fetchMovieInfo(keyword?: string) {
    try {
      const apiUrl =
        typeof keyword === 'string'
          ? API_URL.SEARCH_MOVIES(this.currentPage, keyword)
          : API_URL.POPULAR_MOVIES(this.currentPage);
      const APIMovieResponse = await fetch(apiUrl).then((response) => response.json());
      const fetchStatus = this.getFetchStatus(APIMovieResponse);

      if (!(fetchStatus.statusCode === 200)) {
        this.movieResponse = { result: FETCH_FAIL, fetchStatus: fetchStatus };
        return;
      }

      return APIMovieResponse;
    } catch (error) {
      if (error instanceof Error) {
        const fetchStatus = { statusCode: undefined, statusMessage: error.message };
        this.movieResponse = { result: SYSTEM_CRASHED, fetchStatus }; // 네트워크 에러 등
      }
    }
  }

  getFetchStatus(response: APIMovieResponseType): FetchStatusType {
    if (response.success === false && response.status_message) {
      return { statusCode: response.status_code, statusMessage: response.status_message };
    }

    if (response.success === false && response.errors) {
      return { statusCode: undefined, statusMessage: response.errors[0] };
    }

    return { statusCode: 200, statusMessage: 'Success' };
  }
}

export default MovieFetcher;
