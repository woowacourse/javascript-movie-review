// components
import Header from './Header';
import Title from './Title';
import MovieListContainer from './MovieList/MovieListContainer';
import SeeMore from './SeeMore';
import Component from './core/Component';

import { $ } from '../utils/domHelper';

export default class App extends Component {
  $target;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
  }

  template() {
    return `
      <header></header>
      <main>
        <section class="item-view">
        <h2 class="movie-list-title"></h2>
        <ul class="item-list movie-container"></ul>
        <button class="btn primary full-width"></button>
        </section>
      </main>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  makeComponent() {
    this.setComponentInstance('header', new Header($('header')));
    this.setComponentInstance(
      'movieListContainer',
      new MovieListContainer($('.item-list'))
    );
    this.setComponentInstance('title', new Title($('.movie-list-title')));
    this.setComponentInstance('seeMore', new SeeMore($('.btn')));
  }

  mounted() {
    this.makeComponent();

    const { header, movieListContainer, seeMore } = this.component;

    header?.setEvent();
    movieListContainer?.fetchData();
    seeMore?.setEvent(() => movieListContainer?.fetchData());
  }
}
