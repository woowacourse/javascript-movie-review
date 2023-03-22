// components
import Header from './Header';
import Title from './Title';
import MoviePopularList from './MovieList/MoviePopularList';
import MovieSearchList from './MovieList/MovieSearchList';
import MovieListContainer from './MovieList/MovieListContainer';
import SeeMore from './SeeMore';
import Skeleton from './MovieList/Skeleton';

import { $ } from '../utils/domHelper';

type ComponentType = {
  header?: Header;
  movieListContainer?: MovieListContainer;
  popularMovieList?: MoviePopularList;
  searchMovieList?: MovieSearchList;
  title?: Title;
  seeMore?: SeeMore;
  skeleton?: Skeleton;
};

export default class App {
  $target;

  components: ComponentType;

  constructor($target: HTMLElement) {
    this.$target = $target;

    this.components = {};
  }

  template() {
    return `
      <header></header>
      <main>
        <section class="item-view">
        <h2 class="movie-list-title"></h2>
        <ul class="item-list movie-container"></ul>
        <ul class="item-list skeleton-container"></ul>
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
    this.components.title = new Title($('.movie-list-title'));

    this.components.popularMovieList = new MoviePopularList(
      $('.movie-container')
    );

    this.components.searchMovieList = new MovieSearchList(
      $('.movie-container')
    );

    this.components.movieListContainer = new MovieListContainer({
      $target: $('.movie-container'),
      components: {
        popular: this.components.popularMovieList,
        search: this.components.searchMovieList,
      },
    });

    this.components.header = new Header({
      $target: $('header'),
      components: { search: this.components.searchMovieList },
    });

    this.components.seeMore = new SeeMore({
      $target: $('.btn'),
      components: { movieList: this.components.movieListContainer },
    });

    this.components.skeleton = new Skeleton($('.skeleton-container'));
  }

  mounted() {
    this.makeComponent();

    const { header, movieListContainer, title, seeMore, skeleton } =
      this.components;

    header?.render().setEvent();
    title?.render();
    movieListContainer?.fetchData();
    seeMore?.render().setEvent();
    skeleton?.render();
  }
}
