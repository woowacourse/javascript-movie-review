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
  renderMoreItems(movies: Movie[]) {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    movieList?.insertAdjacentHTML('beforeend', `${movies.map((item) => MovieCard.template(item)).join('')}`);
  },
  render(movies: Movie[]) {
    const movieList = document.querySelector<HTMLUListElement>('.item-list');

    if (movieList === null) return;

    movieList.innerHTML = `${movies.map((item) => MovieCard.template(item)).join('')}`;
  },
};

export default MovieCardList;
