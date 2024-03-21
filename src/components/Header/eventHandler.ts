import uiFeedBackManager from '../../services/UIFeedBackManager';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import pageManager from '../../services/PageManager';

const updateMovieListBanner = (keyword: string) => {
  const h2 = document.querySelector('h2');
  if (!h2) return;
  h2.textContent = `"${keyword}" 검색 결과`;
};

const getMovieListDataByKeyword = async (keyword: string) => {
  const data = await uiFeedBackManager.fetchData(API_ENDPOINT.SEARCH(keyword), 'GET', null, API_OPTION.headers);
  const { results } = data;
  createMovieItems(results);
  pageManager.resetPage();
  addShowMoreButtonEventListener('search', keyword);
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

  input.value = '';
};

export const keywordSubmitHandler = () => {
  const form = document.querySelector('.search-form');
  if (!form) return;

  form.addEventListener('submit', (event) => formSubmitHandler(event));
};
