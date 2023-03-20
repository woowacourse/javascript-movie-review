import { API_URL } from '../constants/constants';
import { APIMovieType, APIResponseType, FetchStatusType, MovieResponseType } from '../types';

class MovieFetcher {
  #currentPage = 1;

  resetPage() {
    this.#currentPage = 1;
  }

  increasePage() {
    this.#currentPage += 1;
  }

  async fetchMovieInfo(keyword?: string): Promise<MovieResponseType> {
    try {
      const apiUrl =
        typeof keyword === 'string'
          ? API_URL.SEARCH_MOVIES(this.#currentPage, keyword)
          : API_URL.POPULAR_MOVIES(this.#currentPage);
      const response = await fetch(apiUrl).then((res) => res.json());
      const fetchStatus = this.getFetchStatus(response);

      if (!(fetchStatus.statusCode === 200)) {
        return { result: 'FETCH_FAIL', fetchStatus: fetchStatus };
      }

      const totalPages = response.total_pages;
      const movieList = response.results.map((currentResult: APIMovieType) => ({
        title: currentResult.title,
        posterPath: currentResult.poster_path,
        voteAverage: currentResult.vote_average,
      }));

      if (this.#currentPage === totalPages)
        return { result: 'FETCH_SUCCESS', movieList, isLastPage: true };

      return { result: 'FETCH_SUCCESS', movieList };
    } catch (error) {
      if (error instanceof Error) {
        const fetchStatus = { statusCode: undefined, statusMessage: error.message };
        return { result: 'SYSTEM_CRASHED', fetchStatus }; // 네트워크 에러 등
      }
      return { result: 'SYSTEM_CRASHED' };
    }
  }

  getFetchStatus(response: APIResponseType): FetchStatusType {
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
