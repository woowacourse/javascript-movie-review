import { APIMovieType, ResponseType } from '../types';

const API_URL = {
  popularity: (pageNo: number) =>
    `https://wzrabbit-movie-review.netlify.app/.netlify/functions/popularMovies?page=${pageNo}`,
  search: (pageNo: number, keyword: string) =>
    `https://wzrabbit-movie-review.netlify.app/.netlify/functions/searchMovies?page=${pageNo}&query=${keyword}`,
};

const ERROR_MESSAGE: Record<number, string> = {
  422: '너무 많은 페이지를 불러왔습니다.',
};

const DEFAULT_ERROR_MESSAGE = '죄송합니다. 문제가 발생하여 영화 정보를 가져오지 못 했습니다.';

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
  async fetchMovies(keyword: string = ''): Promise<ResponseType> {
    console.log('ok start');
    try {
      if (keyword !== '') this.#previousKeyword = keyword;
      const finalKeyword = keyword === '' ? this.#previousKeyword : keyword;

      console.log('keyword is now', finalKeyword);

      const response =
        this.#requestMode === 'popularity'
          ? await fetch(API_URL.popularity(this.#currentPage))
          : await fetch(API_URL.search(this.#currentPage, finalKeyword));

      if (!response.ok) {
        return {
          result: ERROR_MESSAGE[response.status] || DEFAULT_ERROR_MESSAGE,
          status: response.status,
        };
      }

      const responseText = JSON.parse(await response.text());
      const movies = responseText.results.map((movie: APIMovieType) => ({
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
      }));

      if (movies.length === 0) {
        return { result: 'NO_MORE_MOVIES' };
      }

      this.#currentPage += 1;
      return { result: 'OK', movies: movies };
    } catch {
      return { result: 'FETCH_CRASHED' };
    }
  }
}

export default MovieFetcher;
