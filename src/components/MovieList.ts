import { store } from '../store';

import { getPopularMovies, getSearchMovie, IMovie } from '../api/api';

import { $ } from '../utils';

import { deleteSkeletonList, MovieListSkeleton } from './MovieListSkeleton';
import { MovieItem } from './MovieItem';
<<<<<<< HEAD
import { ErrorPage } from './ErrorPage';
=======
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790

export function MovieList() {
  return `
    <ul class="item-list">
    </ul>
  `;
}

export async function renderSkeletonList() {
  const { page, keyword, isPopular } = store.state;

  const $parentElem = $('.item-list') as HTMLElement;
  $parentElem?.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const results = await getPopularMovies(page);
<<<<<<< HEAD

    if (results) {
      renderPopularMovieList(results);
      return;
    }

    $parentElem.innerHTML = ErrorPage();
=======
    renderPopularMovieList(results);

>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
    return;
  }

  const results = await getSearchMovie(keyword, page);
<<<<<<< HEAD

  if (results) {
    renderSearchMovieList(results);
    if (results.length < 20) store.setState({ isContentEnd: true });
    return;
  }

  $parentElem.innerHTML = ErrorPage();
  return;
=======
  renderSearchMovieList(results);

  store.setState({ isContentEnd: true });
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
}

export async function renderPopularMovieList(movies: IMovie[]) {
  const $parentElem = $('.item-list') as HTMLElement;

  $parentElem.innerHTML = `
  ${movies.map((movie) => MovieItem(movie)).join('')}
  
  `;
}

export async function renderSearchMovieList(searchResults: IMovie[]) {
  const $parentElem = $('.item-list') as HTMLElement;

  $parentElem.innerHTML =
    searchResults.length === 0
      ? '검색 결과가 없습니다.'
      : `
  ${searchResults.map((movie) => MovieItem(movie)).join('')}
  
  `;
}

export async function renderMoreSkeletonList() {
  const { page, keyword, isPopular } = store.state;
  const nextPage = (page as number) + 1;

  const $parentElem = $('.item-list') as HTMLElement;
  $parentElem.insertAdjacentHTML('beforeend', MovieListSkeleton());

  if (isPopular) {
    const results = await getPopularMovies(nextPage);
    renderMoreMovieList(results);

    store.setState({ page: nextPage });

    deleteSkeletonList();

    return;
  }
  const results = await getSearchMovie(keyword, nextPage);
  renderMoreMovieList(results);

  store.setState({ page: nextPage });

  deleteSkeletonList();
}

export async function renderMoreMovieList(moreResults: IMovie[]) {
  const $parentElem = $('.item-list') as HTMLElement;

  $parentElem.insertAdjacentHTML(
    'beforeend',
    `${moreResults.map((movie) => MovieItem(movie)).join('')}`
  );
}
