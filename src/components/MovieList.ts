import { IMovie } from '../data/api';
import { MovieItem } from './MovieItem';
import { usePopularMovie } from '../data/useMovie';
import { $ } from '../utils';

export async function renderMovieList() {
  const { values } = await usePopularMovie();

  const parentElem = document.querySelector('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${values.results.map((movie) => MovieItem(movie)).join('')}
  
  ` as string;
}
