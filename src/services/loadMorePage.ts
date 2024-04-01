import { createMovieItems } from '../components/MovieContainer/render';
import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import { Movie } from '../domain/movie';
import { ShowMoreButtonOption } from '../types/tmdb';
import removeHTMLElements from '../utils/removeHTMLElements';
import pageManager from './PageManager';
import uiFeedBackManager from './UIFeedBackManager';

export const checkDataLength = (currentPage: number, total_pages: number, movies: Movie[]) => {
  if (total_pages < currentPage) {
    if (currentShowMoreEventHandler) {
      window.removeEventListener('scroll', currentShowMoreEventHandler);
    }
    displayNoMorePagesMessage();
    return;
  }
  createMovieItems(movies);
};

const displayNoMorePagesMessage = () => {
  const container = document.querySelector('.item-view');
  if (!container) return;

  const message = document.createElement('p');
  message.textContent = '더 이상 페이지가 없습니다.';
  message.classList.add('no-more-pages');
  container.appendChild(message);
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
    pageManager.setTotalPages(moviePage.totalPages);
  }
  if (!event.target) return;
};

let currentShowMoreEventHandler: (event: Event) => void;

const handleScroll = (option: ShowMoreButtonOption, inputValue: string) => {
  return async (event: Event) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const currentPage = pageManager.currentPage;
      const totalPages = pageManager.totalPages;
      if (currentPage < totalPages) {
        removeHTMLElements('.no-more-pages');
        fetchNextPage(event, option, inputValue);
      } else {
        displayNoMorePagesMessage();
        window.removeEventListener('scroll', currentShowMoreEventHandler);
      }
    }
  };
};

const addInfiniteScrollEventListener = async (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  if (currentShowMoreEventHandler) window.removeEventListener('scroll', currentShowMoreEventHandler);

  const initialUrl = getTotalApiUrl(option, inputValue, 1);
  const initialMoviePage = await uiFeedBackManager.fetchData(initialUrl, 'GET', null, API_OPTION.headers);
  if (initialMoviePage) {
    pageManager.setTotalPages(initialMoviePage.totalPages);
    currentShowMoreEventHandler = handleScroll(option, inputValue);
    window.addEventListener('scroll', currentShowMoreEventHandler);
  }
};

export default addInfiniteScrollEventListener;
