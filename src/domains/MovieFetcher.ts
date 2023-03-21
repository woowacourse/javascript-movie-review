import KeyChanger from '../utils/KeyChanger';
import { MovieType, GenreType, FetchResponseType } from '../types';
import { API_URL, ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from '../constants';

const changingKeyPairs: Record<string, string> = {
  poster_path: 'posterPath',
  vote_average: 'voteAverage',
  genre_ids: 'genreIds',
};

type RequestModeType = 'popularity' | 'search' | 'genre';

class MovieFetcher {
  #currentPage = 1;
  #requestMode: RequestModeType = 'popularity';
  #previousKeyword = '';

  resetPage() {
    this.#currentPage = 1;
  }

  setRequestMode(mode: RequestModeType) {
    this.#requestMode = mode;
  }

  /**
   * API 서버로부터 정보를 받아와, 결과를 돌려줍니다.
   *
   * @param keyword - 검색 모드 시 사용할 검색어. 검색 모드가 아닐 경우 무시됩니다.
   * 검색 모드임에도 검색어가 비어 있을 경우에는, 가장 마지막으로 검색했던 단어의 결과를 돌려줍니다.
   *
   * @throws - Fetch가 실패한 경우 에러가 발생할 수 있습니다.
   */
  private async fetchDataFromApi(keyword: string = ''): Promise<Response> {
    if (keyword !== '') this.#previousKeyword = keyword;
    const finalKeyword = keyword === '' ? this.#previousKeyword : keyword;

    const response = await fetch(API_URL[this.#requestMode](this.#currentPage, finalKeyword));
    return response;
  }

  private trimData<T>(
    data: Record<string, unknown>[],
    changingKeyPairs: Record<string, string>,
  ): T {
    const trimmedData = data.map(
      (currentData: Record<string, unknown>) => <T>KeyChanger.change(currentData, changingKeyPairs),
    );

    return trimmedData as T;
  }

  async getMovieData<T extends FetchResponseType>(keyword: string = ''): Promise<T> {
    try {
      const response = await this.fetchDataFromApi(keyword);

      if (!response.ok) {
        return {
          result: 'FAILED',
          status: response.status,
          errorMessage: ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE,
        } as T;
      }

      const responseText = JSON.parse(await response.text());
      const rawData: Record<string, unknown>[] = responseText.results;
      const trimmedData =
        this.#requestMode === 'genre'
          ? this.trimData<GenreType[]>(rawData, changingKeyPairs)
          : this.trimData<MovieType[]>(rawData, changingKeyPairs);

      if (trimmedData.length === 0) {
        return { result: 'NO_RESULT' } as T;
      }

      if (this.#requestMode !== 'genre') {
        this.#currentPage += 1;
      }

      return { result: 'OK', fetchedData: trimmedData } as T;
    } catch (error) {
      return { result: 'FETCH_CRASHED', errorMessage: UNKNOWN_ERROR_MESSAGE } as T;
    }
  }
}

export default MovieFetcher;
