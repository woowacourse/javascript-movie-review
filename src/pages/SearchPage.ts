import Header from '../components/header/SearchHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchSearchMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import TMDBError from '../api/TMDBError.ts';
import { dispatchRouteChange } from '../utils/event.ts';
import Modal from '../components/modal/Modal.ts';

export default class SearchPage {
  #$fragment: DocumentFragment;
  #page: number = 1;
  #main: Main;
  #$modal: Modal;

  constructor(modal: Modal) {
    this.#$modal = modal;

    this.#$fragment = document.createDocumentFragment();
    const query = this.#getQuery();
    const header = new Header(this.#onSubmit);
    this.#main = new Main(`"${query}" 검색 결과`, this.#onDetail);
    const footer = new Footer();

    this.#$fragment.append(header.$element, this.#main.$element, footer.$element);

    this.#initialFetch();
  }

  get $element() {
    return this.#$fragment;
  }

  #getQuery(): string {
    const [, queryString = ''] = window.location.hash.split('?');
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('query') ?? '';
  }

  async #initialFetch() {
    try {
      await this.#appendMovies();
    } catch (error) {
      console.error('Search fetch failed:', error);
    }
  }

  async #loadMore() {
    this.#main.removeMoreButton();
    this.#page += 1;
    await this.#appendMovies();
  }

  async #appendMovies(): Promise<ResponseMovie> {
    this.#main.renderSkeletons();

    try {
      const response = await fetchSearchMovies(this.#getQuery(), this.#page);

      if (response.results.length === 0) {
        this.#main.renderNothing();
        return response;
      }

      this.#main.renderMovies(response.results);

      if (this.#page < response.total_pages) {
        this.#main.renderMoreButton(() => this.#loadMore());
      }

      return response;
    } catch (error) {
      this.#handleError(error);
      throw error;
    } finally {
      this.#main.removeSkeletons();
    }
  }

  #handleError(error: unknown) {
    if (error instanceof TMDBError) {
      this.#main.renderError(`TMDB 에러: ${error.message}`);
      return;
    }

    if (error instanceof Error) {
      this.#main.renderError(`시스템 에러: ${error.message}`);
      return;
    }

    this.#main.renderError('알 수 없는 에러가 발생했습니다.');
  }

  #onSubmit = (query: string): void => {
    if (query.trim()) {
      dispatchRouteChange(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  #onDetail = async (movie_id: number) => {
    try {
      console.log(this.#$modal);
      const movie = await fetchMovieDetails(movie_id);
      this.#$modal.open(movie);
    } catch (e) {
      console.log(e);
    }
  };
}
