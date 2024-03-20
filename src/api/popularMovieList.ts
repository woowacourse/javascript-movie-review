import { POPULAR_MOVIES_URL, fetchData } from '.';
import { MovieInfo, ResponseData, ResponseReject } from './api-type';

export const getPopularMovieList = async (page = 1): Promise<MovieInfo[]> => {
  const url = `${POPULAR_MOVIES_URL}?language=ko-KR&page=${page}`;

  const response = await fetchData(url);
  const data: ResponseData | ResponseReject = await response.json();

  if ('success' in data) {
    console.error(data.status_message);
    throw new Error(data.status_message);
  }

  return data.results;
};
