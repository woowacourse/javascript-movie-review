import Movies, { MovieInfo } from '../domain/Movies';
import MovieItem from '../components/MovieItem/MovieItem';
import CustomError from '../utils/CustomError';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { showAlert } from '../components/Alert/Alert';
import { RULES } from '../constants/rule';
import { $ } from '../utils/dom';
import { ALERT_MESSAGE, ERROR_MESSAGE, TITLE } from '../constants/messages';

class MovieController {
  #page = 1;
  #query = '';
  #movies;

  constructor() {
    this.#movies = new Movies();
  }

  handleViewMoreButtonClick(target: HTMLButtonElement) {
    if (this.#page > RULES.maxPage) {
      target.classList.add('hidden');
      showAlert(ALERT_MESSAGE.lastPage);
      return;
    }

    if (this.#query) {
      this.#renderSearchMovies();
      return;
    }

    this.#renderPopularMovies();
  }

  render(query: string = '') {
    const errorContainer = $('.error-container') as HTMLElement;

    this.#initData(query);

    if (errorContainer.classList.contains('hidden')) {
      errorContainer.classList.add('hidden');
    }

    if (this.#query) {
      this.#renderSearchMovies();
      return;
    }

    this.#renderPopularMovies();
  }

  #initData(query: string) {
    const ul = $('ul.item-list');
    const subtitle = $('.subtitle');
    if (!(ul instanceof HTMLElement) || !(subtitle instanceof HTMLElement)) return;

    subtitle.textContent = query ? `"${query}" ${TITLE.searchResult}` : TITLE.popularMovies;

    this.#page = 1;
    this.#query = query;
    ul.innerHTML = '';
  }

  async #renderPopularMovies() {
    document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
    const movieData = await this.#getPopularMovies(this.#page);

    this.#updateViewMoreButtonDisplay(movieData);

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) =>
        $('ul.item-list')?.insertAdjacentElement('beforeend', movieItem),
      );
      document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
      this.#page += 1;
    }
  }

  async #getPopularMovies(page: number) {
    try {
      const movieData = await this.#movies.getPopularMovies(page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
      $('.view-more-button')?.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  async #renderSearchMovies() {
    document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
    const movieData = await this.#searchMovies(this.#page, this.#query);

    if (movieData && !movieData.length) {
      this.#showErrorPage(ERROR_MESSAGE.noSearchResult);
    }

    this.#updateViewMoreButtonDisplay(movieData);

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => {
        $('ul.item-list')?.appendChild(movieItem);
      });
      document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
      this.#page += 1;
    }
  }

  async #searchMovies(page: number, query: string) {
    try {
      const movieData = await this.#movies.getSearchMovies(query, page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      document.getElementById('skeleton-container')?.classList.toggle('hide-skeleton');
      $('.view-more-button')?.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  #showErrorPage(message: string, status?: number) {
    const errorContainer = $('.error-container') as HTMLElement;

    errorContainer.innerHTML = '';
    errorContainer.appendChild(ErrorPage({ status, message }));
    errorContainer.classList.remove('hidden');
  }

  #updateViewMoreButtonDisplay(movieData: MovieInfo[] | undefined) {
    if (!movieData || movieData.length < RULES.moviesPerPage) {
      $('.view-more-button')?.classList.add('hidden');
    } else {
      $('.view-more-button')?.classList.remove('hidden');
    }
  }
}

export default MovieController;
