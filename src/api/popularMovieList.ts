import { POPULAR_MOVIES_URL, fetchData } from '.';
import { MovieInfo, ResponseData, ResponseReject } from './api-type';

export const getPopularMovieList = async (page: number): Promise<MovieInfo[] | void> => {
  const url = `${POPULAR_MOVIES_URL}?language=ko-KR&page=${page}`;

  const response = await fetchData(url);
  const data: ResponseData | ResponseReject = await response.json();

  if ('success' in data) {
    console.error(data.status_message);
    return;
  }

  return data.results;
};
