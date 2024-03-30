import './MovieListContainer.css';
import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import { InvalidRequestError } from '../../errors/error';
import Modal from '../common/modal/Modal';
import MovieItemDetail from '../movieItemDetail/MovieItemDetail';
import appInstance from '../App/App';

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
  $target: HTMLUListElement = document.createElement('ul');
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
      const { movies, totalPages } = await this.fetchMovies(this.page);
      this.paintOverwrite(movies);

      if (this.$target.parentElement === null) return;
      const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
      if (this.page === totalPages) $moreButton.classList.add('hidden');
      else $moreButton.classList.remove('hidden');
    } catch (e) {
      const target = e as InvalidRequestError;
      this.handleErrorToast(target.message);
    }
  }

  paintOverwrite(movies: IMovie[]) {
    movies.forEach(movie => {
      const newMovie = new MovieItem(movie).$target;
      newMovie.addEventListener('click', e => {
        appInstance.paintModal(new MovieItemDetail(movie).$target);
      });
      this.$target.replaceChild(newMovie, this.$target.children[this.moviesCount]);
      this.moviesCount += 1;
    });
    this.#deleteLastItems(this.$target.children.length - this.moviesCount);
  }

  #deleteLastItems(deleteCount: number) {
    Array.from({ length: deleteCount }).forEach(() => {
      this.$target.removeChild(this.$target.lastChild!);
    });
  }

  async attach() {
    this.$target.innerHTML += TEMPLATE;
    this.page += 1;
    const { movies, totalPages } = await this.fetchMovies(this.page);

    this.paintOverwrite(movies);
    if (this.$target.parentElement === null) return;

    const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
    if (this.page === totalPages) $moreButton.classList.add('hidden');
  }

  async fetchMovies(page: number) {
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
