import { IMovie } from '../data/api';
import { MovieItem } from './MovieItem';
import { usePopularMovie, useSearchedMovie } from '../data/useMovie';
import { $ } from '../utils';

export async function renderPopularMovieList() {
  const { values } = await usePopularMovie();

  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${values.results.map((movie) => MovieItem(movie)).join('')}
  
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
