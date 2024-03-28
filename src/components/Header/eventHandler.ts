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

type SearchType = 'web' | 'mobile';

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

function createMovieItemByKeyword(results: TotalMovieItemProps[], keyword: string) {
  createMovieItems(results);
  pageManager.resetPage();
  initializeInfiniteScroll('search', keyword);
}

const getMovieListDataByKeyword = async (keyword: string) => {
  const dataFromServer = await getMovieDataByKeyword(keyword);

  if (!dataFromServer.length) renderNoMoreDataText('none');

  const results = MovieStorageService.addData(dataFromServer);

  return results;
};

const validateAndLoadMovieList = async (keyword: string) => {
  if (!keyword.length) {
    alert('검색어는 1글자 이상이어야 합니다.');
    return;
  }

  window.scrollTo(0, 0);

  removeHTMLElements('li');
  const results = await getMovieListDataByKeyword(keyword);
  createMovieItemByKeyword(results, keyword);
  updateMovieListBanner(keyword);
};

const selectTargetInputAndRender = (targetInputClass: '.mobile-search-input' | '.web-search-input') => {
  const input = document.querySelector(targetInputClass) as HTMLInputElement;
  if (!isElement(input)) return;

  validateAndLoadMovieList(input.value);
  input.value = '';
};

const formSubmitHandler = (event: Event, searchType: SearchType) => {
  event.preventDefault();

  const targetInputClass = searchType === 'mobile' ? '.mobile-search-input' : '.web-search-input';

  removeExistingNoMoreDataText();
  pageManager.resetPage();
  selectTargetInputAndRender(targetInputClass);
};

export const onSearchMovieByKeyword = (searchType: SearchType) => {
  const targetFormClass = searchType === 'mobile' ? '.mobile-search-form' : '.web-search-form';
  const form = document.querySelector(targetFormClass);
  if (!form) return;

  form.addEventListener('submit', (event) => {
    formSubmitHandler(event, searchType);
  });
};

const reloadPage = () => {
  window.scroll(0, 0);
  window.location.reload();
};

export const onReloadPage = () => {
  const headerBanner = document.querySelector('h1');
  if (!isHTMLElement(headerBanner)) return;

  headerBanner.addEventListener('click', reloadPage);
};

const showMobileInputAndButton = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  const mobileSearchInput = document.querySelector('.mobile-search-input');
  const mobileSubmitButton = document.querySelector('.mobile-submit-button');
  if (!isElement(mobileSearchInput)) return;
  if (!isElement(mobileSubmitButton)) return;
  [mobileSearchInput, mobileSubmitButton].forEach((element) => element.classList.add('visible'));
};

export const onMobileToggleButton = () => {
  const mobileToggleButton = document.querySelector('.mobile-search-button');
  if (!isElement(mobileToggleButton)) return;

  mobileToggleButton.addEventListener('click', (event) => showMobileInputAndButton(event));
  mobileToggleButton.classList.add('hide');
};

const mobileInputEnterSearch = (event: KeyboardEvent, mobileSearchInput: HTMLInputElement) => {
  removeExistingNoMoreDataText();
  if (event.key === 'Enter') {
    event.preventDefault();
    const keyword = mobileSearchInput.value;
    validateAndLoadMovieList(keyword);
    mobileSearchInput.value = '';
  }
};

export const onEnterMovieKeywordMobileInput = () => {
  const mobileSearchInput = document.querySelector('.mobile-search-input') as HTMLInputElement;
  if (!isElement(mobileSearchInput)) return;
  mobileSearchInput.addEventListener('keypress', (event) => mobileInputEnterSearch(event, mobileSearchInput));
};
