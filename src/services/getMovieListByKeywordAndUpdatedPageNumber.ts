import movieFetcherWithLoadingOrErrorState from './MovieFetcherWithLoadingOrErrorState';
import { API_OPTION } from '../constants/api/api';

const getMovieListByKeywordAndUpdatedPageNumber = async (totalUrl: string) => {
  const data = await movieFetcherWithLoadingOrErrorState.fetchData(totalUrl, {
    headers: API_OPTION.headers,
  });
  const { results } = data;

  return results;
};

export default getMovieListByKeywordAndUpdatedPageNumber;
