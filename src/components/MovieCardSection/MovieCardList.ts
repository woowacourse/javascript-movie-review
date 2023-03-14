import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

const MovieCardList = {
  template(list: Movie[]) {
    return `
      <ul class="item-list">
        ${list.map((item) => MovieCard.template(item))}
      </ul>
    `;
  },
};

export default MovieCardList;
