import './MovieListContainer.css';
import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import CONFIG from '../../constants/config';
import skeleton from '../common/Skeleton';
import movieInfo from '../../domain/movieInfo';

class MovieListContainer {
  $target = document.createElement('ul');
  page = CONFIG.FIRST_PAGE;

  constructor() {
    this.$target.classList.add('item-list');
    this.$target.appendChild(skeleton.create(CONFIG.MOVIE_COUNT_PER_PAGE));

    this.fetchMovies(this.page)
      .then(({ movies, totalPages }) => {
        this.paint(movieInfo.createAll(movies), totalPages);
      })
      .catch(error => {
        if (error instanceof Error) this.handleErrorToast(error.message);
      });
  }

  paint(movies: Movie[], totalPages: number) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem().create(movie)));
    this.validateMoreButton(totalPages);
  }

  async attach() {
    const movieItems = Array.from({ length: CONFIG.MOVIE_COUNT_PER_PAGE }).map(() => new MovieItem());
    this.page += 1;
    this.$target.append(...movieItems.map(movieItem => movieItem.$target));
    const { movies, totalPages } = await this.fetchMovies(this.page);
    movies.map((movie, index) => movieItems[index].paint(movieInfo.create(movie)));
    this.validateMoreButton(totalPages);
  }

  async fetchMovies(page: number) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(page);
    return movies;
  }

  validateMoreButton(totalPages: number) {
    if (this.$target.parentElement === null) return;
    const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
    if (this.page === totalPages) {
      $moreButton.classList.add('hidden');
      return;
    }
    $moreButton.classList.remove('hidden');
  }

  initPageNumber() {
    this.page = CONFIG.FIRST_PAGE;
  }

  handleErrorToast(errorMessage: string) {
    const $toastButton = dom.getElement<HTMLButtonElement>(document.body, '#toast_button');
    const clickEvent = new CustomEvent('onToast', {
      detail: errorMessage,
      bubbles: true,
    });
    $toastButton.dispatchEvent(clickEvent);
  }
}

export default MovieListContainer;
