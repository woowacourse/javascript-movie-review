import ApiClient from './ApiClient';
import { MovieDetailResponse } from './type';

export const getMovieDetail = async ({ movieId }: { movieId: number }): Promise<MovieDetailResponse> => {
  const params = new URLSearchParams({
    language: 'ko-KR'
  });
  const data = await ApiClient.get(`/movie/${movieId}?${params}`);
  return data;
};

export default getMovieDetail;
