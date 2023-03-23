import { store } from '../store';

import { getPopularMovies, getSearchMovie, IMovie } from '../api/api';

import { $ } from '../utils';

import { deleteSkeletonList, MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';

export function MovieList() {
  return `
    <ul class="item-list">
    </ul>
  `;
}

export async function renderSkeletonList() {
  const { page, keyword, isPopular } = store.state;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem?.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(page);

    renderPopularMovieList(results);
    return;
  }

  const { results } = await getSearchMovie(keyword, page);

  renderSearchMovieList(results);

  store.setState({ isContentEnd: true });
}

export async function renderMoreSkeletonList() {
  const { page, keyword, isPopular } = store.state;
  const nextPage = page + 1;

  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const { results } = await getPopularMovies(nextPage);
    renderMoreMovieList(results);

    store.setState({ page: nextPage });

    deleteSkeletonList();

    return;
  }
  const { results } = await getSearchMovie(keyword, nextPage);
  renderMoreMovieList(results);

  store.setState({ page: nextPage });

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
