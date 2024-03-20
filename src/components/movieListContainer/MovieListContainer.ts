import { getPopularMovies } from '../../apis/movie';
import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target;
  page = 0;

  constructor() {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');
    (async () => {
      await this.paint();
    })();
  }

  async paint() {
    // 검색 새로했을 때
    this.$target.replaceChildren();
    await this.attach();
  }

  async attach() {
    // 더보기 눌렀을 때
    this.page += 1;
    const movies = await getPopularMovies(this.page);
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }
}

export default MovieListContainer;
