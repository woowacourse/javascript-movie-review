import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

const MovieCardList = {
  template(list: Movie[]) {
    return `
      <ul class="item-list">
        ${list.map((item) => MovieCard.template(item)).join('')}
      </ul>
    `;
  },
  render(movies: Movie[]) {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    if (!movieList) return;

    movieList.insertAdjacentHTML('beforeend', `${movies.map((item) => MovieCard.template(item)).join('')}`);
  },
};

export default MovieCardList;
