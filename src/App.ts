import Header from './components/Header';
import MovieSearch from './components/Header/MovieSearch';
import MovieCardSection from './components/MovieCardSection';
import LoadMoreButton from './components/MovieCardSection/LoadMoreButton';

import Movies from './domain/Movies';
import { convertToAppMovies } from './domain/util';

import getPopularMovies from './api/getPopularMovies';
import getSearchedMovies from './api/getSearchedMovies';
import { MAX_PAGE } from './constants';
import { isCustomErrorMessage } from './constants/message';
import { ID } from './constants/selector';
import { $ } from './utils/dom';

import type { AppMovie } from './types/movie';

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
  }

  async init() {
    this.render();
    MovieCardSection.render(this.#movies, this.getMovies.bind(this));
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
    MovieSearch.setEvent(this.#movies, this.getMovies.bind(this));
    LoadMoreButton.setEvent(this.#movies, this.getMovies.bind(this));
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
      }
    }
  }
}

export default App;
