import { publisher } from '../store/publisher';

import { getPopularMovies, getSearchMovie, IMovie } from '../api/api';

import { $, $$ } from '../utils';

import { MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';
import { renderPageTitle } from './PageTitle';
import { renderViewMoreButton } from './ViewMoreButton';

export async function renderSkeletonList(state: publisher) {
  const { page, keyword, isPopular } = state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  renderPageTitle(keyword, isPopular);

  if (isPopular) {
    const { results } = await getPopularMovies(page);
    renderPopularMovieList(results);

    return;
  }

  const { results } = await getSearchMovie(keyword, page);

  renderSearchMovieList(results);
  renderViewMoreButton(results.length < 20);
}

export async function renderMoreSkeletonList(state: publisher) {
  const { page, keyword, isPopular } = state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(page + 1);

    renderMoreMovieList(results);
    deleteSkeletonList();

    return;
  }

  const { results } = await getSearchMovie(keyword, page + 1);

  renderMoreMovieList(results);
  renderViewMoreButton(results.length < 20);

  deleteSkeletonList();
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

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}

export function MovieList() {
  return `
    <ul class="item-list">
    </ul>
  `;
}
