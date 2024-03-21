import { MOVIE_SEARCH_URL, fetchData } from '.';
import { MovieInfo, ResponseData, ResponseReject } from './api-type';

export const getSearchMovieList = async (query: string, page = 1): Promise<MovieInfo[] | void> => {
  const url = `${MOVIE_SEARCH_URL}?query=${query}&language=ko-KR&page=${page}`;

  const response = await fetchData(url);
  const data: ResponseData | ResponseReject = await response.json();

  if ('success' in data) {
    console.error(data.status_message);
    return;
  }

  return data.results;
};
