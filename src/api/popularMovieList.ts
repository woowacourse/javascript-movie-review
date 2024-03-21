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

export const handleErrorResponse = (status: number) => {
  if (status === 401) throw new Error('401-Unauthorized');
  if (status === 404) throw new Error('404-Not Found');
  if (status === 500) throw new Error('500-Internal Server Error');
  if (status === 503) throw new Error('503-Service Unavailable');
};
