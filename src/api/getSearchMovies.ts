import { Response } from './type';
import ApiClient from './ApiClient';

export const getSearchMovies = async ({ page, query }: { page: number; query: string }): Promise<Response> => {
  const params = new URLSearchParams({
    include_adult: 'false',
    language: 'en-US',
    page: String(page),
    query
  });
  const data = await ApiClient.get(`/search/movie?${params.toString()}`);
  return data;
};

export default getSearchMovies;
