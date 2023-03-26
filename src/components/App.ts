// components
import Header from './Header';
import Title from './Title';
import MoviePopularList from './MovieList/MoviePopularList';
import MovieSearchList from './MovieList/MovieSearchList';
import MovieListContainer from './MovieList/MovieListContainer';
import Skeleton from './MovieList/Skeleton';
import MovieItemModal from './MovieList/MovieDetail';
import MovieDetail from './MovieList/MovieDetail';

// utils
import { $ } from '../utils/domHelper';

type ComponentType = {
  header?: Header;
  movieListContainer?: MovieListContainer;
  popularMovieList?: MoviePopularList;
  searchMovieList?: MovieSearchList;
  title?: Title;
  skeleton?: Skeleton;
  modal?: MovieItemModal;
  detail?: MovieDetail;
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
        </section>
        <div class="modal-container"></div>
      </main>
    `;
  }

  makeComponent() {
    this.components.title = new Title($('.movie-list-title'));

    this.components.popularMovieList = new MoviePopularList(
      $('.movie-container')
    );

    this.components.searchMovieList = new MovieSearchList(
      $('.movie-container')
    );

    this.components.detail = new MovieDetail($('.modal-container'));

    this.components.movieListContainer = new MovieListContainer({
      $target: $('.movie-container'),
      components: {
        popular: this.components.popularMovieList,
        search: this.components.searchMovieList,
        detail: this.components.detail,
      },
    });

    this.components.header = new Header({
      $target: $('header'),
      components: { search: this.components.searchMovieList },
    });

    this.components.skeleton = new Skeleton($('.skeleton-container'));
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    this.makeComponent();

    const { header, movieListContainer, title, skeleton, detail } =
      this.components;

    header?.render().setEvent();
    title?.render();
    movieListContainer?.fetchData().setEvent();
    skeleton?.render();
    detail?.setEvent();
  }
}
