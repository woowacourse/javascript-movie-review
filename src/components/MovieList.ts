import { publisher } from '../store/publisher';

import { getPopularMovies, getSearchMovie, IMovie } from '../api/api';

import { $, $$ } from '../utils';

import { MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';

import { renderViewMoreButton } from './ViewMoreButton';

export function MovieList() {
  return `
    <ul class="item-list">
    </ul>
  `;
}

export async function renderSkeletonList() {
  const { page, keyword, isPopular } = publisher.state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem?.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(page);

    renderPopularMovieList(results);
    return;
  }

  const { results } = await getSearchMovie(keyword, page);

  renderSearchMovieList(results);
  renderViewMoreButton(results.length < 20);
}

export async function renderMoreSkeletonList() {
  const { page, keyword, isPopular } = publisher.state;
  const nextPage = page + 1;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(nextPage);
    renderMoreMovieList(results);

    publisher.setState({ page: nextPage });

    deleteSkeletonList();

    return;
  }
  const { results } = await getSearchMovie(keyword, nextPage);
  renderMoreMovieList(results);

  publisher.setState({ page: nextPage });

  deleteSkeletonList();

  return;
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
