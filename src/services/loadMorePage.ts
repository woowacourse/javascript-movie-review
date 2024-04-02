import { createMovieItems } from '../components/MovieContainer/render';
import { API_ENDPOINT, API_OPTION } from '../constants/api/api';
import { Movie } from '../domain/movie';
import { ShowMoreButtonOption } from '../types/tmdb';
import createElement from '../utils/createElement';
import removeHTMLElements from '../utils/removeHTMLElements';
import pageManager from './PageManager';
import uiFeedBackManager from './UIFeedBackManager';

export const checkDataLength = (currentPage: number, total_pages: number, movies: Movie[]) => {
  if (total_pages < currentPage) {
    displayNoMorePagesMessage();
    return;
  }
  createMovieItems(movies);
};

const displayNoMorePagesMessage = () => {
  const container = document.querySelector('.item-view');
  if (!container) return;

  const message = createElement('p', {
    className: 'no-more-pages',
    textContent: '더 이상 페이지가 없습니다.',
  });

  if (!document.querySelector('.no-more-pages')) {
    container.appendChild(message);
  }
};

const getTotalApiUrl = (option: ShowMoreButtonOption, keyword: string, pageNumber: number) => {
  return option === 'search' && keyword.length > 0
    ? API_ENDPOINT.SEARCH(keyword, pageNumber)
    : API_ENDPOINT.POPULAR(pageNumber);
};

const fetchNextPage = async (option: ShowMoreButtonOption, keyword: string) => {
  const currentPage = pageManager.currentPage;
  const updatePageNumber = pageManager.increasePage();
  const totalUrl = getTotalApiUrl(option, keyword, updatePageNumber);
  const moviePage = await uiFeedBackManager.fetchData(totalUrl, 'GET', null, API_OPTION.headers);
  if (moviePage) {
    checkDataLength(currentPage, moviePage.totalPages, moviePage.movies);
    pageManager.setTotalPages(moviePage.totalPages);
    updateTargetElement();
  }
};

const createIntersectionObserver = (option: ShowMoreButtonOption, inputValue: string) => {
  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const currentPage = pageManager.currentPage;
        const totalPages = pageManager.totalPages;
        if (currentPage < totalPages) {
          removeHTMLElements('.no-more-pages');
          await fetchNextPage(option, inputValue);
        } else {
          displayNoMorePagesMessage();
          observer.disconnect();
        }
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });

  return observer;
};

const updateTargetElement = () => {
  const currentTarget = document.querySelector('.item-view li:last-child');
  if (currentTarget) {
    observer.observe(currentTarget);
  }
};

let observer: IntersectionObserver;

const addInfiniteScrollEventListener = async (option: ShowMoreButtonOption = 'popular', inputValue: string = '') => {
  if (observer) {
    observer.disconnect();
  }

  observer = createIntersectionObserver(option, inputValue);

  const initialUrl = getTotalApiUrl(option, inputValue, 1);
  const initialMoviePage = await uiFeedBackManager.fetchData(initialUrl, 'GET', null, API_OPTION.headers);
  if (initialMoviePage) {
    pageManager.setTotalPages(initialMoviePage.totalPages);

    const target = document.querySelector('.item-list li:last-child');
    if (target) {
      observer.observe(target);
    }
  }
};

export default addInfiniteScrollEventListener;
