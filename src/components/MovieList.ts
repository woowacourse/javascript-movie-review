import { IMovie } from '../data/api';
import { MovieItem } from './MovieItem';
import {
  getPageStatus,
  getRecentKeyword,
  usePopularMovie,
  useSearchedMovie,
} from '../data/useMovie';
import { $, $$ } from '../utils';
import { Skeleton } from './Skeleton';

export async function renderSkeletonList() {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML('beforeend', Skeleton());

  await usePopularMovie().then(({ values }) => renderPopularMovieList(values.results));
}

export async function renderMoreSkeletonList() {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML('beforeend', Skeleton());

  if (getPageStatus() === 'popular') {
    await usePopularMovie().then(({ values }) => {
      renderMoreMovieList(values.results);
      deleteSkeletonList();
    });
  } else {
    await useSearchedMovie(getRecentKeyword()).then(({ values }) => {
      renderMoreMovieList(values.results);
      deleteSkeletonList();
    });
  }
}

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}

export async function renderPopularMovieList(results: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${results.map((movie) => MovieItem(movie)).join('')}
  
  ` as string;
}

export async function renderSearchMovieList(searchResults: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${searchResults.map((movie) => MovieItem(movie)).join('')}
  
  ` as string;
}

export async function renderMoreMovieList(moreResults: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML(
    'beforeend',
    `${moreResults.map((movie) => MovieItem(movie)).join('')}`
  );
}
