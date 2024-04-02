import { ERROR_MESSAGE } from '../constants/errorMessage';
import { API_PATH, RENDER_TYPE } from '../constants/movie';
import { MovieListType } from '../types/movie';
import HTTPError from './HttpError';

/**
 * 오프라인에 대응하는 에러 메세지 출력하는 함수
 */
async function tryCatchApi(link: string) {
  try {
    const response = await fetch(link);
    return response;
  } catch (error) {
    throw new HTTPError(0, ERROR_MESSAGE.EXCEPTION_ERROR);
  }
}

const httpRequest = {
  async fetchPopularMovies(
    page: number,
  ): Promise<{ movieList: MovieListType; isLastPage: boolean }> {
    const url = `${API_PATH}/movie/${RENDER_TYPE.POPULAR}?${new URLSearchParams({
      api_key: `${process.env.API_KEY}`,
      language: 'ko-KR',
      page: `${page}`,
    })}`;

    const response = await tryCatchApi(url);

    if (response.status !== 200)
      throw new HTTPError(response.status, ERROR_MESSAGE.EXCEPTION_ERROR);

    const responseData = await response.json();
    const movieList = responseData.results;

    const { total_pages: totalPages, page: currentPages } = responseData;
    const isLastPage = totalPages === currentPages;
    return { movieList, isLastPage };
  },

  async fetchSearchedMovies(
    page: number,
    input: string,
  ): Promise<{ movieList: MovieListType; isLastPage: boolean }> {
    const url = `${API_PATH}/${RENDER_TYPE.SEARCH}/movie?${new URLSearchParams({
      api_key: `${process.env.API_KEY}`,
      language: 'ko-KR',
      page: `${page}`,
      query: `${input}`,
    })}`;

    const response = await tryCatchApi(url);

    if (response.status !== 200)
      throw new HTTPError(response.status, ERROR_MESSAGE.EXCEPTION_ERROR);

    const responseData = await response.json();
    const movieList = responseData.results;
    if (movieList.length === 0) {
      throw new HTTPError(response.status, ERROR_MESSAGE.NO_SEARCHED_RESULTS);
    }

    const { total_pages: totalPages, page: currentPages } = responseData;
    const isLastPage = totalPages === currentPages;
    return { movieList, isLastPage };
  },

  async fetchMovieDetail(movieId: number) {
    const url = `${API_PATH}/movie/${movieId}?${new URLSearchParams({
      api_key: `${process.env.API_KEY}`,
      language: 'ko-KR',
    })}`;

    const response = await tryCatchApi(url);

    if (response.status !== 200)
      throw new HTTPError(response.status, ERROR_MESSAGE.EXCEPTION_ERROR);

    const movieDetail = await response.json();
    return movieDetail;
  },
};

export default httpRequest;
