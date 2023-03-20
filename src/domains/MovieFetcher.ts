import { API_URL } from '../constants/constants';
import { APIMovieType, ResponseType } from '../types';

class MovieFetcher {
  #currentPage = 1;

  resetPage() {
    this.#currentPage = 1;
  }

  async fetchMovieInfo(keyword?: string): Promise<ResponseType> {
    try {
      const apiUrl =
        typeof keyword === 'string'
          ? API_URL.SEARCH_MOVIES(this.#currentPage, keyword)
          : API_URL.POPULAR_MOVIES(this.#currentPage);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 422) return { result: 'PAGE_ERROR' };
        if (response.status >= 400 && response.status <= 499) return { result: 'CLIENT_ERROR' };
        if (response.status >= 500 && response.status <= 599) return { result: 'SERVER_ERROR' };

        return { result: '' };
      }

      const responseText = await response.text();
      const parsedResponseText = JSON.parse(responseText);

      const movieList = parsedResponseText.results.map((currentResult: APIMovieType) => ({
        title: currentResult.title,
        posterPath: currentResult.poster_path,
        voteAverage: currentResult.vote_average,
      }));

      if (movieList.length === 0) {
        return { result: 'EMPTY_LIST', movieList };
      }

      this.#currentPage += 1;

      return { result: 'OK', movieList };
    } catch (error) {
      return { result: 'SYSTEM_CRASHED' };
    }
  }
}

export default MovieFetcher;
