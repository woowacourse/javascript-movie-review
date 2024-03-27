import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import loadingOrErrorStateUIManager from './MovieFetcherWithLoadingOrErrorState';

const getMovieDataByKeyword = async (keyword: string) => {
  const data = await loadingOrErrorStateUIManager.fetchData(API_ENDPOINT.SEARCH(keyword), {
    headers: API_OPTION.headers,
  });
  return data.results;
};

export default getMovieDataByKeyword;
