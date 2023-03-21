import { IMovie } from '../api';

import { $, $$ } from '../utils';

import { usePopularMovie, useSearchedMovie } from '../hooks/useMovie';
import { getPage, getPageStatus, POPULAR, SEARCH } from '../hooks/usePage';
import { getRecentKeyword } from '../hooks/useKeyword';

import { MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';
import { PAGE_TITLE } from '../constants/constants';

export function renderPageTitle(keyword?: string | undefined) {
  const $pageTitle = $('.page-title') as HTMLElement;

  if (getPageStatus() === SEARCH && keyword) {
    $pageTitle.innerText = PAGE_TITLE.showSearchResult(keyword);
    return;
  }

  $pageTitle.innerText = PAGE_TITLE.POPULAR_NOW;
}

export async function renderSkeletonList() {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  await usePopularMovie(getPage()).then(({ values }) => renderPopularMovieList(values.results));
}

export async function renderMoreSkeletonList() {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (getPageStatus() === POPULAR) {
    const {
      values: { results },
    } = await usePopularMovie(getPage() + 1);
    renderMoreMovieList(results);
    deleteSkeletonList();

    return;
  }

  await useSearchedMovie(getRecentKeyword(), getPage() + 1).then(({ values }) => {
    renderMoreMovieList(values.results);
    deleteSkeletonList();
  });
}

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}

export async function renderPopularMovieList(results: IMovie[]) {
  renderPageTitle();

  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${results.map((movie) => MovieItem(movie)).join('')}
  
  ` as string;
}

export async function renderSearchMovieList(searchResults: IMovie[]) {
  renderPageTitle(getRecentKeyword());
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML =
    searchResults.length === 0
      ? '검색 결과가 없습니다.'
      : (`
    ${searchResults.map((movie) => MovieItem(movie)).join('')}
  
  ` as string);
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
