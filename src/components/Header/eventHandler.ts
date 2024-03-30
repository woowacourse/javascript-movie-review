import uiFeedBackManager from '../../services/UIFeedBackManager';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import pageManager from '../../services/PageManager';
import scrollToTop from '../../utils/scrollToTop';
import addInfiniteScrollEventListener from '../../services/loadMorePage';

const updateMovieListBanner = (keyword: string) => {
  const h2 = document.querySelector('h2');
  if (!h2) return;
  h2.textContent = `"${keyword}" 검색 결과`;
};

const getMovieListDataByKeyword = async (keyword: string) => {
  const moviePage = await uiFeedBackManager.fetchData(API_ENDPOINT.SEARCH(keyword), 'GET', null, API_OPTION.headers);

  if (moviePage) createMovieItems(moviePage.movies);
  pageManager.resetPage();
  // addShowMoreButtonEventListener('search', keyword);
  addInfiniteScrollEventListener('search', keyword);
};

const validateAndLoadMovieList = (keyword: string) => {
  if (!keyword.length) {
    alert('검색어는 1글자 이상이어야 합니다..');
    return;
  }
  removeHTMLElements('li');
  getMovieListDataByKeyword(keyword);
  updateMovieListBanner(keyword);
};

const formSubmitHandler = (event: Event) => {
  event.preventDefault();
  const input = document.querySelector('input');
  if (!input) return;
  validateAndLoadMovieList(input.value);
  scrollToTop();
};

export const keywordSubmitHandler = () => {
  const form = document.querySelector('.search-form');
  if (!form) return;

  form.addEventListener('submit', (event) => formSubmitHandler(event));
};
