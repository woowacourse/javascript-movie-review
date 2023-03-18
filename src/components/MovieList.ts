import { IMovie } from '../data/api';
import { MovieItem } from './MovieItem';
import { stateGetter, usePopularMovie, useSearchedMovie } from '../data/PageData';
import { $, $$ } from '../utils';
import { Skeleton } from './Skeleton';

type callPlaceType = 'popular' | 'search' | 'more';
type keywordType = string | null;
export async function showMovieList(callPlace: callPlaceType, keyword: keywordType) {
  const PageStatus = stateGetter.getPageStatus();
  renderSkeleton();

  if (callPlace === 'popular') {
    await usePopularMovie().then(({ values }) => renderMovieList(values.results));
    return;
  }
  if (callPlace === 'search' && keyword) {
    await useSearchedMovie(keyword).then(({ values }) => renderMovieList(values.results));
    return;
  }
  if (callPlace === 'more' && PageStatus === 'popular') {
    await usePopularMovie().then(({ values }) => renderAddMovieList(values.results));
  }
  if (callPlace === 'more' && PageStatus === 'search') {
    await useSearchedMovie(stateGetter.getRecentKeyword()).then(({ values }) => {
      renderAddMovieList(values.results);
    });
  }

  deleteSkeleton();
}

export function renderSkeleton() {
  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', Skeleton());
}

export function deleteSkeleton() {
  const skeletonList = $$('.skeleton-item');
  skeletonList?.forEach((item) => item.remove());
}

export async function renderMovieList(results: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${results.map((movie) => MovieItem(movie)).join('')}
    `;
}

export async function renderAddMovieList(results: IMovie[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML(
    'beforeend',
    `${results.map((movie) => MovieItem(movie)).join('')}`
  );
}
