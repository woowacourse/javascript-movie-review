import { IMovie } from '../type';
import Movie from './Movie';

function MovieList({ movies }: { movies: IMovie[] }) {
  return /*html */ `
    <h2>지금 인기 있는 영화</h2>
        <ul class="thumbnail-list">
        ${movies.map((movie) => Movie({ movie })).join('')}
    </ul>`;
}

export default MovieList;
