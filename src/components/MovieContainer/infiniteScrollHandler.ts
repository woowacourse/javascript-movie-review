import getMovieListByKeywordAndUpdatedPageNumber from '../../services/getMovieListByKeywordAndUpdatedPageNumber';
import { ShowMoreButtonOption } from '../../types/movie';
import { createMovieItems } from './render';
import pageManager from '../../services/PageManager';
import isElement from '../../utils/isElement';
import createElement from '../../utils/createElement';
import MovieStorageService from '../../services/MovieStorageService';
import { API_ENDPOINT } from '../../constants/api/api';

type NoData = 'max' | 'none';

export const DATA_LENGTH_PER_PAGE = 20;

const MAX_PAGE_NUMBER = 10;

export const getTotalApiUrl = (option: ShowMoreButtonOption, keyword: string, pageNumber: number) => {
  return option === 'search' && keyword.length > 0
    ? API_ENDPOINT.SEARCH(keyword, pageNumber)
    : API_ENDPOINT.POPULAR(pageNumber);
};

export const renderNoMoreDataText = (type: NoData) => {
  const noMoreText = createElement('h2', {
    textContent: type === 'max' ? '더 이상 불러올 데이터가 존재하지 않아요!' : '검색 결과가 존재하지 않아요!',
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

const isValidPageNumber = (updatedPageNumber: number): boolean => {
  return updatedPageNumber <= MAX_PAGE_NUMBER;
};

const getMoreMovieDataScroll = async (option: ShowMoreButtonOption, keyword: string, updatedPageNumber: number) => {
  const totalUrl = getTotalApiUrl(option, keyword, updatedPageNumber);
  const dataResults = await getMovieListByKeywordAndUpdatedPageNumber(totalUrl);
  const movieListResults = MovieStorageService.addData(dataResults);

  return movieListResults;
};

const fetchNextPageData = async (option: ShowMoreButtonOption, keyword: string, observer: IntersectionObserver) => {
  const updatedPageNumber = pageManager.increasePage();

  if (!isValidPageNumber(updatedPageNumber)) {
    renderNoMoreDataText('max');
    return;
  }
  const movieListResults = await getMoreMovieDataScroll(option, keyword, updatedPageNumber);

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
    renderNoMoreDataText('max');
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
