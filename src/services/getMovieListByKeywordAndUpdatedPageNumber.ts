import { ShowMoreButtonOption } from '../types/movie';
import { getTotalApiUrl } from '../components/ShowMoreButton/eventHandler';
import pageManager from './PageManager';
import loadingOrErrorStateUIManager from './LoadingOrErrorStateUIManager';
import { API_OPTION } from '../constants/api/api';

const getMovieListByKeywordAndUpdatedPageNumber = async (keyword: string, option: ShowMoreButtonOption) => {
  const updatePageNumber = pageManager.increasePage();
  const totalUrl = getTotalApiUrl(option, keyword, updatePageNumber);
  const data = await loadingOrErrorStateUIManager.fetchData(totalUrl, { headers: API_OPTION.headers });
  const { results } = data;

  return results;
};

export default getMovieListByKeywordAndUpdatedPageNumber;
