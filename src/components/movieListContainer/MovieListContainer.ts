import './MovieListContainer.css';
import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import { InvalidRequestError } from '../../errors/error';

const MOVIE_ITEM_SKELETON_COUNT = 20;
const TEMPLATE = `<li>
  <a href="#">
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  </a>
</li>`.repeat(MOVIE_ITEM_SKELETON_COUNT);

class MovieListContainer {
  readonly $target: HTMLUListElement = document.createElement('ul');
  page = 1;
  moviesCount = 0;

  constructor() {
    this.$target.classList.add('item-list');
    this.render();
  }

  async render() {
    this.$target.innerHTML = TEMPLATE;
    this.initPageNumber();

    try {
      const { movies, totalPages } = await this.#fetchMovies(this.page);
      this.paintOverwrite(movies);
    } catch (e) {
      const target = e as InvalidRequestError;
      this.handleErrorToast(target.message);
    }
  }

  paintOverwrite(movies: IMovie[]) {
    movies.forEach(movie => {
      this.$target.replaceChild(new MovieItem(movie).$target, this.$target.children[this.moviesCount]);
      this.moviesCount += 1;
    });
    this.#deleteLastNItems(this.$target.children.length - this.moviesCount);
  }

  #deleteLastNItems(deleteCount: number) {
    Array.from({ length: deleteCount }).forEach(() => {
      this.$target.removeChild(this.$target.lastChild!);
    });
  }

  async attach() {
    this.$target.insertAdjacentHTML('beforeend', TEMPLATE);
    this.page += 1;
    const { movies, totalPages } = await this.#fetchMovies(this.page);

    this.paintOverwrite(movies);
    if (this.$target.parentElement === null) return;
  }

  async #fetchMovies(page: number) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(page);
    return movies;
  }

  initPageNumber() {
    this.page = 1;
    this.moviesCount = 0;
  }

  handleErrorToast(errorMessage: string) {
    const $button = dom.getElement<HTMLButtonElement>(document.body, '#toast_btn');
    const clickEvent = new CustomEvent('onToast', {
      detail: errorMessage,
      bubbles: true,
    });
    $button.dispatchEvent(clickEvent);
  }
}

export default MovieListContainer;
