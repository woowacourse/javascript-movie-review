import { publisher } from '../store/publisher';

import { getPopularMovies, getSearchMovie, IMovie } from '../api/api';

import { $, $$ } from '../utils';

import { MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';
import { PAGE_TITLE } from '../constants/constants';

export function renderPageTitle(keyword: string, isPopular: boolean) {
  const $pageTitle = $('.page-title') as HTMLElement;
  if (!isPopular && keyword) {
    $pageTitle.innerText = PAGE_TITLE.showSearchResult(keyword);
    return;
  }

  $pageTitle.innerText = PAGE_TITLE.POPULAR_NOW;
}

export function renderViewMoreButton(isContentEnd: boolean) {
  if (isContentEnd) {
    const $viewMoreButton = $('.view-more-button') as HTMLElement;
    $viewMoreButton.style.display = 'none';
  }
}

export async function renderSkeletonList(state: publisher) {
  console.log('here');
  const { page, keyword, isPopular } = state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  renderPageTitle(keyword, isPopular);

  if (isPopular) {
    const { results } = await getPopularMovies(page);
    renderPopularMovieList(results);

    return;
  }

  const { results } = await getSearchMovie(keyword, page + 1);

  renderSearchMovieList(results);
  renderViewMoreButton(results.length < 20);
  renderMoreMovieList(results);
}

export async function renderMoreSkeletonList(state: publisher) {
  const { keyword, isPopular } = state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(state.page + 1);

    renderMoreMovieList(results);
    deleteSkeletonList();

    return;
  }

  const { results } = await getSearchMovie(keyword, state.page + 1);

  renderViewMoreButton(results.length < 20);
  renderMoreMovieList(results);

  deleteSkeletonList();
}

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}

export async function renderPopularMovieList(results: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${results.map((movie) => MovieItem(movie)).join('')}
  
  `;
}

export async function renderSearchMovieList(searchResults: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML =
    searchResults.length === 0
      ? '검색 결과가 없습니다.'
      : `
    ${searchResults.map((movie) => MovieItem(movie)).join('')}
  
  `;
}

export async function renderMoreMovieList(moreResults: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML(
    'beforeend',
    `${moreResults.map((movie) => MovieItem(movie)).join('')}`
  );
}

export function MovieList() {
  return `
    <ul class="item-list">
    </ul>
  `;
}
