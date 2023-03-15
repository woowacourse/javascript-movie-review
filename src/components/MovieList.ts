import { IMovie } from '../data/api';
import { MovieItem } from './MovieItem';

export function MovieList(movieList: IMovie[]) {
  return `
        <ul class="item-list">
          ${movieList && movieList.map((movie) => MovieItem(movie)).join('')}  
        </ul>
    `;
}
