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
      </section>
    </main>
    `;
  }

  render() {
    (async () => {
      const movies = await getPopularMovies(1);
      const movieListContainer = new MovieListContainer(movies);
      const $section = dom.getElement<HTMLElement>(this.$target, '.item-view');
      $section.appendChild(movieListContainer.$target);
    })();

    this.$target.innerHTML = this.template();
    const header = new Header({ imageSrc: './images/logo.png' });
    this.$target.prepend(header.$target);
  }
}
export default App;
