import getMovieListByKeywordAndUpdatedPageNumber from '../../services/getMovieListByKeywordAndUpdatedPageNumber';
import { ShowMoreButtonOption } from '../../types/movie';
import { getTotalApiUrl } from './eventHandler';
import { createMovieItems } from '../MovieContainer/render';
import pageManager from '../../services/PageManager';
import isElement from '../../utils/isElement';
import createElement from '../../utils/createElement';
import MovieStorageService from '../../services/MovieStorageService';

export const DATA_LENGTH_PER_PAGE = 20;

const MAX_PAGE_NUMBER = 10;

export const renderNoMoreDataText = () => {
  const noMoreText = createElement('h2', {
    textContent: '데이터가 존재하지 않습니다!',
    className: 'no-more-text',
  });
  const section = document.querySelector('.item-view');
  if (!isElement(section)) return;
  section.appendChild(noMoreText);
};

const observeLastListItem = (observer: IntersectionObserver) => {
  const items = document.querySelectorAll('.item-list li');
  const lastItem = items[items.length - 1];
  if (lastItem) observer.observe(lastItem);
};

const isValidUpdatedPageNumber = (updatedPageNumber: number) => {
  if (updatedPageNumber > MAX_PAGE_NUMBER) {
    renderNoMoreDataText();
    return false;
  }
  return true;
};

const fetchNextPageData = async (option: ShowMoreButtonOption, keyword: string, observer: IntersectionObserver) => {
  const updatedPageNumber = pageManager.increasePage();
  if (!isValidUpdatedPageNumber(updatedPageNumber)) return;
  const totalUrl = getTotalApiUrl(option, keyword, updatedPageNumber);
  const dataResults = await getMovieListByKeywordAndUpdatedPageNumber(totalUrl);
  const movieListResults = MovieStorageService.addData(dataResults);

  createMovieItems(movieListResults);
  observeLastListItem(observer);
};

/* eslint-disable max-lines-per-function */
const loadMoreMovieData = (
  observer: IntersectionObserver,
  option: ShowMoreButtonOption,
  keyword: string,
  entry: IntersectionObserverEntry,
) => {
  const currentPageNumber = pageManager.getCurrentPage();
  if (currentPageNumber <= MAX_PAGE_NUMBER) {
    fetchNextPageData(option, keyword, observer);
    observer.unobserve(entry.target);
  } else {
    observer.disconnect();
    renderNoMoreDataText();
  }
};

/* eslint-disable max-lines-per-function */
const setupInfiniteScroll = (option: ShowMoreButtonOption, keyword: string) => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMoreMovieData(observer, option, keyword, entry);
      }
    },
    {
      rootMargin: '100px',
    },
  );

  const items = document.querySelectorAll('.item-list li');
  const lastItem = items[items.length - 1];
  if (lastItem) observer.observe(lastItem);
};

export const initializeInfiniteScroll = (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  setupInfiniteScroll(option, inputValue);
};
