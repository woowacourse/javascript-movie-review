import loadingOrErrorStateUIManager from '../../services/LoadingOrErrorStateUIManager';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import pageManager from '../../services/PageManager';
import isHTMLElement from '../../utils/isHTMLElement';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { MovieItemProps, ShowMoreButtonOption } from '../../types/movie';
import { DATA_LENGTH_PER_PAGE } from '../ShowMoreButton/eventHandler';

const updateMovieListBanner = (keyword: string) => {
  const h2 = document.querySelector('h2');
  if (!isHTMLElement(h2)) return;
  h2.textContent = `"${keyword}" 검색 결과`;
};

const removeExistingShowMoreButton = () => {
  const button = document.querySelector('.btn');
  if (!button) return;
  button.remove();
};

const isExistingShowMoreButton = () => !!document.querySelector('.btn');

async function fetchMovieData(keyword: string) {
  const data = await loadingOrErrorStateUIManager.fetchData(API_ENDPOINT.SEARCH(keyword), {
    headers: API_OPTION.headers,
  });
  return data.results;
}

function createMovieItemsWithCheck(results: MovieItemProps[], keyword: string) {
  createMovieItems(results);

  if (results.length < DATA_LENGTH_PER_PAGE) {
    removeExistingShowMoreButton();
    return;
  }

  manageShowMoreButton('search', keyword);
}

function manageShowMoreButton(action: ShowMoreButtonOption, keyword: string) {
  if (!isExistingShowMoreButton()) {
    const showMoreButton = ShowMoreButton();
    const section = document.querySelector('section');
    if (section) section.appendChild(showMoreButton);
  }
  addShowMoreButtonEventListener(action, keyword);
}

const getMovieListDataByKeyword = async (keyword: string) => {
  const results = await fetchMovieData(keyword);
  createMovieItemsWithCheck(results, keyword);
};

const validateAndLoadMovieList = (keyword: string) => {
  if (!keyword.length) {
    alert('검색어는 1글자 이상이어야 합니다.');
    return;
  }
  removeHTMLElements('li');
  getMovieListDataByKeyword(keyword);
  updateMovieListBanner(keyword);
};

const formSubmitHandler = (event: Event) => {
  event.preventDefault();
  pageManager.resetPage();
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

const reloadPage = () => {
  window.location.reload();
};

export const reloadPageHandler = () => {
  const headerBanner = document.querySelector('h1');
  if (!isHTMLElement(headerBanner)) return;

  headerBanner.addEventListener('click', reloadPage);
};
