import KeyChanger from '../utils/KeyChanger';
import { MovieType, MovieFetchResponseType } from '../types';
import { API_URL, ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from '../constants';

const changingKeyPairs: Record<string, string> = {
  poster_path: 'posterPath',
  vote_average: 'voteAverage',
};

class MovieFetcher {
  #currentPage = 1;
  #requestMode = 'popularity';
  #previousKeyword = '';

  resetPage() {
    this.#currentPage = 1;
  }

  setRequestMode(mode: string) {
    this.#requestMode = mode;
  }

  /**
   * 정해져 있는 페이지와 검색 모드를 토대로 API 서버와의 통신을 통해 영화 정보를 받아와, 그 결과를 돌려줍니다.
   * 만약 검색 모드임에도 검색어가 비어 있는 경우에는, 이전 검색어를 그대로 사용하여 정보를 받아옵니다.
   *
   * @param keyword - 검색 모드 시 사용할 검색어. 검색 모드가 아닐 경우 무시됩니다.
   */
  async fetchMovies(keyword: string = ''): Promise<MovieFetchResponseType> {
    try {
      if (keyword !== '') this.#previousKeyword = keyword;
      const finalKeyword = keyword === '' ? this.#previousKeyword : keyword;

      const response =
        this.#requestMode === 'popularity'
          ? await fetch(API_URL.popularity(this.#currentPage))
          : await fetch(API_URL.search(this.#currentPage, finalKeyword));

      if (!response.ok) {
        return {
          result: 'FAILED',
          status: response.status,
          errorMessage: ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE,
        };
      }

      const responseText = JSON.parse(await response.text());
      console.log(responseText);
      const rawMovies: Record<string, unknown>[] = responseText.results;

      const movies = rawMovies.map(
        (movie: Record<string, unknown>) => <MovieType>KeyChanger.change(movie, changingKeyPairs),
      );

      if (movies.length === 0) {
        return { result: 'NO_MORE_MOVIES' };
      }

      this.#currentPage += 1;
      return { result: 'OK', movies: movies };
    } catch {
      return { result: 'FETCH_CRASHED', errorMessage: UNKNOWN_ERROR_MESSAGE };
    }
  }
}

export default MovieFetcher;
