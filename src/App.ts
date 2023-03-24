import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';

import Movies from './domain/Movies';
import RatedMovies from './domain/RatedMovies';
import { convertToAppMovies } from './domain/util';

import { getPopularMovies, getSearchedMovies } from './api';
import { MAX_PAGE, MOVIE_STORAGE_ID } from './constants';
import { DEFAULT_ERROR_MESSAGE, isCustomErrorMessage } from './constants/message';
import { ID } from './constants/selector';
import { $ } from './utils/dom';

import type { AppMovie } from './types/movie';
import ratedMovieStates from './states/ratedMovies';

interface ConvertingMovies {
  list: AppMovie[];
  totalPages: number;
}

export type GetMovies = (query?: string) => Promise<ConvertingMovies | undefined>;

class App {
  #app: HTMLDivElement;

  #movies: Movies;

  constructor() {
    this.#app = $<HTMLDivElement>(`#${ID.APP}`);
    this.#movies = new Movies();
    this.getMovies = this.getMovies.bind(this);
  }

  init() {
    this.render();
    MovieCardSection.render(this.#movies, this.getMovies);
    this.setEvent();
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${MovieCardSection.template()}
      </main>
    `;
  }

  setEvent() {
    Header.setEvent(this.#movies, this.getMovies);
    MovieCardSection.setEvent(this.#movies, this.getMovies);

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(MOVIE_STORAGE_ID, JSON.stringify(ratedMovieStates.getList()));
    });
  }

  async getMovies(query: string = '') {
    try {
      if (!this.#movies.isCurrentQuery(query)) {
        this.#movies.reset(query);
      }

      this.#movies.addPage();

      const { results, total_pages: totalPages } =
        query === '' ? await getPopularMovies(this.#movies.getPage()) : await getSearchedMovies(query, this.#movies.getPage());
      const movies = convertToAppMovies(results);

      this.#movies.add(movies);

      return { list: movies, totalPages: Math.min(MAX_PAGE, totalPages) };
    } catch (error) {
      if (isCustomErrorMessage(error)) {
        MovieCardSection.renderErrorMessage(error);
        return;
      }

      if (error instanceof Error) {
        MovieCardSection.renderErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    }
  }
}

export default App;
