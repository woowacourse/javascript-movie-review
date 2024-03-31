import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import movieFetcher from './MovieFetcher';

const getMovieDataByKeyword = async (keyword: string) => {
  const data = await movieFetcher.fetchData(API_ENDPOINT.SEARCH(keyword), {
    headers: API_OPTION.headers,
  });

  return data.results;
};

export default getMovieDataByKeyword;
