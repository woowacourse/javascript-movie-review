import KeyChanger from '../utils/KeyChanger';
import {
  MovieType,
  GenreType,
  FetchResponseType,
  FailResponseType,
  isMoviesType,
  isGenresType,
} from '../types';
import { API_URL, ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE, NO_RESULT_MESSAGE } from '../constants';

const changingKeyPairs: Record<string, string> = {
  poster_path: 'posterPath',
  vote_average: 'voteAverage',
  genre_ids: 'genreIds',
};

type RequestModeType = 'popularity' | 'search' | 'genre';

class MovieFetcher {
  private currentPage = 1;
  private requestMode: RequestModeType = 'popularity';
  private previousKeyword = '';
  private failedToFetch = false;

  resetPage() {
    this.currentPage = 1;
  }

  setRequestMode(mode: RequestModeType) {
    this.requestMode = mode;
  }

  getFailedToFetchStatus() {
    return this.failedToFetch;
  }

  resetFailedToFetchStatus() {
    this.failedToFetch = false;
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
    if (keyword !== '') this.previousKeyword = keyword;
    const finalKeyword = keyword === '' ? this.previousKeyword : keyword;

    const response = await fetch(API_URL[this.requestMode](this.currentPage, finalKeyword));
    return response;
  }

  private trimData(data: Record<string, unknown>[], changingKeyPairs: Record<string, string>) {
    const trimmedData = data.map((currentData: Record<string, unknown>) =>
      KeyChanger.change(currentData, changingKeyPairs),
    );

    return trimmedData;
  }

  async fetchMovieData(
    keyword: string = '',
  ): Promise<FetchResponseType<MovieType[]> | FailResponseType> {
    try {
      this.failedToFetch = true;

      const response = await this.fetchDataFromApi(keyword);

      if (!response.ok) {
        return {
          isSuccess: false,
          errorMessage: ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE,
        };
      }

      const responseText = JSON.parse(await response.text());
      const trimmedData = this.trimData(responseText.results, changingKeyPairs);

      if (!isMoviesType(trimmedData)) {
        return {
          isSuccess: false,
          errorMessage: UNKNOWN_ERROR_MESSAGE,
        };
      }

      if (trimmedData.length === 0) {
        return {
          isSuccess: false,
          errorMessage: NO_RESULT_MESSAGE,
        };
      }

      this.currentPage += 1;
      this.failedToFetch = false;

      return {
        isSuccess: true,
        fetchedData: trimmedData,
      };
    } catch (error) {
      return {
        isSuccess: false,
        errorMessage: UNKNOWN_ERROR_MESSAGE,
      };
    }
  }

  async fetchGenreData(
    keyword: string = '',
  ): Promise<FetchResponseType<GenreType[]> | FailResponseType> {
    try {
      const response = await this.fetchDataFromApi(keyword);

      if (!response.ok) {
        return {
          isSuccess: false,
          errorMessage: ERROR_MESSAGE[response.status] || UNKNOWN_ERROR_MESSAGE,
        };
      }

      const responseText = JSON.parse(await response.text());
      const trimmedData = this.trimData(responseText.genres, changingKeyPairs);

      if (!isGenresType(trimmedData)) {
        return {
          isSuccess: false,
          errorMessage: UNKNOWN_ERROR_MESSAGE,
        };
      }

      if (trimmedData.length === 0) {
        return {
          isSuccess: false,
          errorMessage: NO_RESULT_MESSAGE,
        };
      }

      return {
        isSuccess: true,
        fetchedData: trimmedData,
      };
    } catch (error) {
      return {
        isSuccess: false,
        errorMessage: UNKNOWN_ERROR_MESSAGE,
      };
    }
  }
}

export default MovieFetcher;
