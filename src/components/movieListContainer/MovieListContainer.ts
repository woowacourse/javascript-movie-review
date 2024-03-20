import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target;
  page = 0;

  constructor() {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');
    (async () => {
      this.page += 1;
      const movies = await getPopularMovies(this.page);
      await this.paint(movies);
    })();
  }

  // 맨 처음 생성할 때 -> 생성자에서 호출
  // 검색했을 때 -> 검색어에 해당하는 데이터로 새로 그리기
  async paint(movies: IMovie[]) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  // 더보기 눌렀을 때
  async attach() {
    this.page += 1;

    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode');
    const title = urlSearchParams.get('title');
    const page = urlSearchParams.get('page');
    if (!title || !mode || !page) return;

    const movies =
      mode === 'search' ? await searchMoviesByTitle(title, Number(page)) : await getPopularMovies(this.page);
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }
}

export default MovieListContainer;
