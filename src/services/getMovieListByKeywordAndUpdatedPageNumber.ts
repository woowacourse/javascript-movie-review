import movieFetcher from './MovieFetcher';
import { API_OPTION } from '../constants/api/api';

const getMovieListByKeywordAndUpdatedPageNumber = async (totalUrl: string) => {
  const data = await movieFetcher.fetchData(totalUrl, {
    headers: API_OPTION.headers,
  });
  const { results } = data;

  return results;
};

export default getMovieListByKeywordAndUpdatedPageNumber;
