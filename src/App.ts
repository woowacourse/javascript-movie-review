import { $ } from './utils/domHelper';
import Header from './components/Header';
import MovieList from './components/MovieList';
import SeeMore from './components/SeeMore';
import Title from './components/Title';

export default class App {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  template() {
    return `
      <main>
        <section class="item-view">
        <h2 class="movie-list-title"></h2>
        </section>
      </main>
    `;
  }

  render() {
    new Header($('#app')).render().setEvent();
    this.$target.insertAdjacentHTML('beforeend', this.template());
    new Title($('.movie-list-title'));
    new MovieList($('.item-view'));
    new SeeMore($('.item-view')).render().setEvent();
  }
}
