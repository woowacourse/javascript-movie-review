import { getPopularMovies } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target;
  page = 1;

  constructor() {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');
    (async () => {
      const movies = await getPopularMovies(this.page);
      this.paint(movies);
    })();
  }

  paint(movies: IMovie[]) {
    // 검색새로했을때 등
    this.$target.replaceChildren();
    this.attach(movies);
  }

  attach(movies: IMovie[]) {
    // 더보기 눌렀을때
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }
}

export default MovieListContainer;
