import { createMovieItems } from '../MovieContainer/render';
import removeHTMLElements from '../../utils/removeHTMLElements';
import pageManager from '../../services/PageManager';
import isHTMLElement from '../../utils/isHTMLElement';
import { TotalMovieItemProps } from '../../types/movie';
import isElement from '../../utils/isElement';
import getMovieDataByKeyword from '../../services/getMovieDataByKeyword';
import { initializeInfiniteScroll } from '../ShowMoreButton/infiniteScrollHandler';
import { renderNoMoreDataText } from '../ShowMoreButton/infiniteScrollHandler';
import MovieStorageService from '../../services/MovieStorageService';

const removeExistingNoMoreDataText = () => {
  const noMoreText = document.querySelector('.no-more-text');
  if (!isElement(noMoreText)) return;
  noMoreText.remove();
};

const updateMovieListBanner = (keyword: string) => {
  const h2 = document.querySelector('h2');
  if (!isHTMLElement(h2)) return;
  h2.textContent = `"${keyword}" 검색 결과`;
};

function createMovieItemsWithCheck(results: TotalMovieItemProps[], keyword: string) {
  createMovieItems(results);
  pageManager.resetPage();
  initializeInfiniteScroll('search', keyword);
}

const getMovieListDataByKeyword = async (keyword: string) => {
  const dataFromServer = await getMovieDataByKeyword(keyword);
  if (!dataFromServer.length) renderNoMoreDataText();
  const results = MovieStorageService.addData(dataFromServer);
  createMovieItemsWithCheck(results, keyword);
};

const validateAndLoadMovieList = (keyword: string) => {
  if (!keyword.length) {
    alert('검색어는 1글자 이상이어야 합니다.');
    return;
  }
  window.scrollTo(0, 0);
  removeHTMLElements('li');
  getMovieListDataByKeyword(keyword);
  updateMovieListBanner(keyword);
};

const formSubmitHandler = (event: Event) => {
  event.preventDefault();
  removeExistingNoMoreDataText();
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
