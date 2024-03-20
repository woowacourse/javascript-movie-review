import { getPopularMovies } from '../apis/movie';
import { dom } from '../utils/dom';
import Header from './header/Header';
import MovieListContainer from './movieListContainer/MovieListContainer';

class App {
  $target: HTMLElement;

  constructor() {
    this.$target = document.createElement('div');
    this.$target.id = 'app';
    this.render();
  }

  template() {
    return `
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <slot class="slot-movie-list"></slot>
        <button class="btn primary full-width">더 보기</button>
      </section>
    </main>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    const header = new Header({ imageSrc: './images/logo.png' });
    const movieListContainer = new MovieListContainer();

    const slotMovieList = dom.getElement(this.$target, '.slot-movie-list');
    slotMovieList.replaceWith(movieListContainer.$target);
    this.$target.prepend(header.$target);
  }
}
export default App;
