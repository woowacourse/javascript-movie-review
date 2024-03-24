import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import uiFeedBackManager from '../../services/UIFeedBackManager';

import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import pageManager from '../../services/PageManager';
import { ShowMoreButtonOption } from '../../types/tmdb';

const MAX_PAGE_NUMBER = 10;

const DATA_LENGTH_PER_PAGE = 20;

const checkMaxPage = (pageNumber: number, eventTarget: EventTarget) => {
  if (pageNumber > MAX_PAGE_NUMBER && eventTarget instanceof Element) {
    removeHTMLElements('.btn');
  }
};

export const checkDataLength = (dataLength: number) => {
  if (dataLength < DATA_LENGTH_PER_PAGE) removeHTMLElements('.btn');
};

const getTotalApiUrl = (option: ShowMoreButtonOption, keyword: string, pageNumber: number) => {
  return option === 'search' && keyword.length > 0
    ? API_ENDPOINT.SEARCH(keyword, pageNumber)
    : API_ENDPOINT.POPULAR(pageNumber);
};

const fetchNextPage = async (event: Event, option: ShowMoreButtonOption, keyword: string) => {
  const updatePageNumber = pageManager.increasePage();
  const totalUrl = getTotalApiUrl(option, keyword, updatePageNumber);
  const moviePage = await uiFeedBackManager.fetchData(totalUrl, 'GET', null, API_OPTION.headers);
  if (moviePage) {
    checkDataLength(moviePage.movies.length);
    createMovieItems(moviePage.movies);
  }
  if (!event.target) return;
  checkMaxPage(updatePageNumber, event.target);
};

let currentShowMoreEventHandler: (event: Event) => void;

const showMoreButtonEventHandler = (option: ShowMoreButtonOption, inputValue: string) => {
  return async (event: Event) => {
    fetchNextPage(event, option, inputValue);
  };
};

export const addShowMoreButtonEventListener = (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  const showMoreButton = document.querySelector('.btn');
  if (!showMoreButton) return;
  if (currentShowMoreEventHandler) showMoreButton.removeEventListener('click', currentShowMoreEventHandler);

  currentShowMoreEventHandler = showMoreButtonEventHandler(option, inputValue);
  showMoreButton.addEventListener('click', currentShowMoreEventHandler);
};

export default showMoreButtonEventHandler;
