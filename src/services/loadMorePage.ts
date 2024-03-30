import { createMovieItems } from '../components/MovieContainer/render';
import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import { DATA_LENGTH_PER_PAGE, MAX_PAGE_NUMBER } from '../constants/ui';
import { Movie } from '../domain/movie';
import { ShowMoreButtonOption } from '../types/tmdb';
import removeHTMLElements from '../utils/removeHTMLElements';
import pageManager from './PageManager';
import uiFeedBackManager from './UIFeedBackManager';

const checkMaxPage = (pageNumber: number, eventTarget: EventTarget) => {
  if (pageNumber > MAX_PAGE_NUMBER && eventTarget instanceof Element) {
    removeHTMLElements('.btn');
  }
};

export const checkDataLength = (currentPage: number, total_pages: number, movies: Movie[]) => {
  console.log('totalPage:', total_pages);
  console.log('currentPage', currentPage);
  console.log(total_pages < currentPage);
  if (total_pages < currentPage) {
    if (currentShowMoreEventHandler) {
      window.removeEventListener('scroll', currentShowMoreEventHandler);
    }
    return;
  }
  createMovieItems(movies);
};

const getTotalApiUrl = (option: ShowMoreButtonOption, keyword: string, pageNumber: number) => {
  return option === 'search' && keyword.length > 0
    ? API_ENDPOINT.SEARCH(keyword, pageNumber)
    : API_ENDPOINT.POPULAR(pageNumber);
};

const fetchNextPage = async (event: Event, option: ShowMoreButtonOption, keyword: string) => {
  const currentPage = pageManager.currentPage;
  const updatePageNumber = pageManager.increasePage();
  const totalUrl = getTotalApiUrl(option, keyword, updatePageNumber);
  const moviePage = await uiFeedBackManager.fetchData(totalUrl, 'GET', null, API_OPTION.headers);
  if (moviePage) {
    checkDataLength(currentPage, moviePage.totalPages, moviePage.movies);
  }
  if (!event.target) return;
  checkMaxPage(updatePageNumber, event.target);
};

let currentShowMoreEventHandler: (event: Event) => void;

const dd = (option: ShowMoreButtonOption, inputValue: string) => {
  return async (event: Event) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log('실행되는중ㅋㅋ');
      fetchNextPage(event, option, inputValue);
    }
  };
};

const addInfiniteScrollEventListener = (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  if (currentShowMoreEventHandler) window.removeEventListener('scroll', currentShowMoreEventHandler);

  currentShowMoreEventHandler = dd(option, inputValue);
  window.addEventListener('scroll', currentShowMoreEventHandler);
};

export default addInfiniteScrollEventListener;
