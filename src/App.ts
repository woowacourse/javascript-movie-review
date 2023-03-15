import { $ } from './utils/domHelper';
import Header from './components/Header';
import MovieList from './components/MovieList';
import SeeMore from './components/SeeMore';

export default class App {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  template() {
    return `
      <main>
        <section class="item-view"></section>
      </main>
    `;
  }

  render() {
    new Header($('#app')).render();
    this.$target.insertAdjacentHTML('beforeend', this.template());
    new MovieList($('.item-view'));
    new SeeMore($('.item-view')).render().setEvent();
  }
}
