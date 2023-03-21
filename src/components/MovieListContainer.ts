import { $ } from '../utils/domSelector';
import { MOVIE_LIST_LOADING, MOVIE_LIST_RESET } from '../constants';
import MovieList from '../domain/MovieList';

class MovieListContainer {
  private static instance: MovieListContainer;
  private listContainer: HTMLDivElement;
  private itemList: HTMLUListElement;
  private moreButton: HTMLButtonElement;

  private constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.init();
    this.listContainer = $<HTMLDivElement>('.item-view');
    this.itemList = $<HTMLUListElement>('.item-list');
    this.moreButton = $<HTMLButtonElement>('#more-button');
    this.addEventListenerToMoreButton();
    this.addEventListenerToMovieItems();
  }

  static getInstance(): MovieListContainer {
    if (!MovieListContainer.instance) {
      MovieListContainer.instance = new MovieListContainer();
    }

    return MovieListContainer.instance;
  }

  private template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>
      <div class="error-message hide"></div>
    `;
  }

  private init() {
    MovieList.on(MOVIE_LIST_RESET, () => {
      this.showListContainer();
    });

    MovieList.on(MOVIE_LIST_LOADING, () => {
      this.hideMoreButton();
    });
  }

  private addEventListenerToMoreButton() {
    this.moreButton.addEventListener('click', () => {
      MovieList.getMovieData();
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

  showListContainer() {
    this.listContainer.classList.remove('hide');
  }

  hideListContainer() {
    this.listContainer.classList.add('hide');
  }

  showMoreButton() {
    this.moreButton.classList.remove('hide');
  }

  hideMoreButton() {
    this.moreButton.classList.add('hide');
  }
}

export default MovieListContainer.getInstance();
