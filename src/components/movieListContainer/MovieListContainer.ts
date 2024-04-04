import './MovieListContainer.scss';

import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import CONFIG from '../../constants/config';
import skeleton from '../common/Skeleton';
import movieInfo from '../../domain/movieInfo';
import MovieDetailModal from '../movieDetailModal/movieDetailModal';

class MovieListContainer {
  $target = document.createElement('ul');
  page = CONFIG.FIRST_PAGE;
  movieDetailModal = new MovieDetailModal();

  constructor() {
    this.$target.classList.add('item-list');
    this.$target.appendChild(skeleton.create(CONFIG.MOVIE_COUNT_PER_PAGE));

    this.fetchMovies(this.page).then(fetchData => {
      if (!fetchData) return;
      const { movies, totalPages } = fetchData;
      this.paint(movieInfo.createAll(movies), totalPages);
    });

    document.body.appendChild(this.movieDetailModal.$target);
  }

  paint(movies: Movie[], totalPages: number) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(this.movieDetailModal).create(movie)));
    this.validateMoreButton(totalPages);
  }

  async attach() {
    const movieItems = Array.from({ length: CONFIG.MOVIE_COUNT_PER_PAGE }).map(
      () => new MovieItem(this.movieDetailModal),
    );
    this.page += 1;
    this.$target.append(...movieItems.map(movieItem => movieItem.$target));

    const fetchData = await this.fetchMovies(this.page);
    if (!fetchData) return;
    const { movies, totalPages, movieCount } = fetchData;
    movies.map((movie, index) => movieItems[index].paint(movieInfo.create(movie)));
    const isValidMoreButton = this.validateMoreButton(totalPages);
    if (!isValidMoreButton) this.erase(totalPages, movieCount);
  }

  erase(totalPages: number, movieCount: number) {
    const restMovieCount = totalPages * CONFIG.MOVIE_COUNT_PER_PAGE - movieCount;
    const length = this.$target.children.length;

    Array.from({ length: restMovieCount }, (_, i) => i + 1).forEach(idx => {
      this.$target.removeChild(this.$target.childNodes[length - idx]);
    });
  }

  async fetchMovies(page: number) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    try {
      return mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(page);
    } catch (error) {
      const { message } = error as Error;
      this.handleErrorToast(message);
    }
  }

  validateMoreButton(totalPages: number) {
    if (this.$target.parentElement === null) return;
    const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
    if (this.page === totalPages) {
      $moreButton.classList.add('hidden');
      return false;
    }
    $moreButton.classList.remove('hidden');
    return true;
  }

  initPageNumber() {
    this.page = CONFIG.FIRST_PAGE;
  }

  handleErrorToast(errorMessage: string) {
    const $toastButton = dom.getElement<HTMLButtonElement>(document.body, '#toast-button');
    const clickEvent = new CustomEvent('onToast', {
      detail: errorMessage,
      bubbles: true,
    });

    $toastButton.dispatchEvent(clickEvent);
  }
}

export default MovieListContainer;
