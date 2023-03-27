import { $ } from '../utils/domSelector';
import { MOVIE_LIST_LOADED, MOVIE_LIST_LOADING, MOVIE_LIST_RESET } from '../constants';
import { SCROLL_OFFSET } from '../constants/ui';
import MovieList from '../domain/MovieList';

class MovieListContainer {
  private static instance: MovieListContainer;
  private listContainer: HTMLDivElement;
  private itemList: HTMLUListElement;
  private shouldScroll: boolean = true;

  private constructor() {
    this.render();
    this.initMovieListEvents();

    this.listContainer = $<HTMLDivElement>('.item-view');
    this.itemList = $<HTMLUListElement>('.item-list');

    this.addEventListenerToScroll();
    this.addEventListenerToMovieItems();
    this.addEventListenerToBrowserBackButton();
    this.addEventListenerToBrowserReloadButton();
  }

  static getInstance(): MovieListContainer {
    if (!MovieListContainer.instance) {
      MovieListContainer.instance = new MovieListContainer();
    }

    return MovieListContainer.instance;
  }

  private render() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
  }

  private template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
      </section>
      <div class="error-message hide"></div>
    `;
  }

  private initMovieListEvents() {
    MovieList.on(MOVIE_LIST_RESET, this.showListContainer.bind(this));
    MovieList.on(MOVIE_LIST_LOADING, this.disableScroll.bind(this));
    MovieList.on(MOVIE_LIST_LOADED, this.enableScroll.bind(this));
  }

  showListContainer() {
    this.listContainer.classList.remove('hide');
  }

  hideListContainer() {
    this.listContainer.classList.add('hide');
  }

  disableScroll() {
    this.shouldScroll = false;
  }

  enableScroll() {
    this.shouldScroll = true;
  }

  private addEventListenerToScroll() {
    window.addEventListener('scroll', () => {
      if (!this.shouldScroll) return;

      const endOfPage =
        window.innerHeight + window.scrollY + SCROLL_OFFSET >= document.body.offsetHeight;

      if (endOfPage) {
        MovieList.getMovieData();
      }
    });
  }

  private addEventListenerToMovieItems() {
    this.itemList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const itemLink = target.closest('a');

      if (itemLink instanceof HTMLAnchorElement) {
        event.preventDefault();

        const url = new URL(itemLink.href);
        const params = new URLSearchParams(url.search);
        const movieId = params.get('id');
        MovieList.getMovieInformation(Number(movieId));
      }
    });
  }

  private addEventListenerToBrowserBackButton() {
    window.addEventListener('popstate', (event) => {
      if (!event.state) return;

      if (event.state.isList) {
        MovieList.init(event.state.searchQuery);
        MovieList.getMovieData();
      }
    });
  }

  private addEventListenerToBrowserReloadButton() {
    window.addEventListener('load', () => {
      if (!history.state) return;

      if (history.state.isList) {
        MovieList.init(history.state.searchQuery);
        MovieList.getMovieData();
      }
    });
  }
}

export default MovieListContainer.getInstance();
