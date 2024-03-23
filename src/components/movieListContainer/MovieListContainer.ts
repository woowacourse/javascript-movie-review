import './MovieListContainer.css';
import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import CONFIG from '../../constants/config';

class MovieListContainer {
  $target: HTMLUListElement = document.createElement('ul');
  page = CONFIG.FIRST_PAGE;

  constructor() {
    this.$target.classList.add('item-list');
    this.$target.innerHTML += this.template();

    this.fetchMovies(this.page)
      .then(({ movies, totalPages }) => {
        this.paint(movies);
        this.validateMoreButton(totalPages);
      })
      .catch(e => {
        if (e instanceof Error) this.handleErrorToast(e.message);
      });
  }

  template() {
    return `<li>
              <a href="#">
                <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
                </div>
              </a>
            </li>`.repeat(CONFIG.MOVIE_COUNT_PER_PAGE);
  }

  paint(movies: Movie[]) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  async attach() {
    this.$target.innerHTML += this.template();
    const { movies, totalPages } = await this.fetchMovies(this.page);
    Array.from({ length: CONFIG.MOVIE_COUNT_PER_PAGE }).forEach(() => {
      this.$target.removeChild(this.$target.lastChild!);
    });
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
    this.validateMoreButton(totalPages);
    this.page += 1;
  }

  async fetchMovies(page: number) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(this.page);
    return movies;
  }

  validateMoreButton(totalPages: number) {
    if (this.$target.parentElement === null) return;
    const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
    if (this.page === totalPages) $moreButton.classList.add('hidden');
  }

  initPageNumber() {
    this.page = CONFIG.FIRST_PAGE;
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
