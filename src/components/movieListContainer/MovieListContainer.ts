import './MovieListContainer.css';

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

    this.fetchMovies(this.page).then(({ movies, totalPages }) => {
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
    const { movies, totalPages, movieCount } = await this.fetchMovies(this.page);
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

    const movies = mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(page);
    return movies;
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
}

export default MovieListContainer;
