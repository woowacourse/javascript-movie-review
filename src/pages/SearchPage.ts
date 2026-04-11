import Header from '../components/header/SearchHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchSearchMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import { CUSTOM_EVENT, dispatchRouteChange } from '../utils/event.ts';
import Modal from '../components/modal/Modal.ts';

export default class SearchPage {
  #$div: HTMLElement;
  #main: Main;
  #$modal: Modal;

  #totalPage: number;
  #page: number;
  #isLoading: boolean;

  constructor(modal: Modal) {
    this.#page = 1;
    this.#totalPage = 1;
    this.#$modal = modal;
    this.#isLoading = false;

    const query = this.#getQuery();

    this.#$div = document.createElement('div');
    this.#$div.id = `${query}`;
    const header = new Header(this.#onSubmit);
    this.#main = new Main(`"${query}" 검색 결과`, this.#onDetail);
    const footer = new Footer();

    this.#$div.append(header.$element, this.#main.$element, footer.$element);
    window.addEventListener(CUSTOM_EVENT.SCROLL_END, () => {
      const isPage = window.document.querySelector(`#${query}`);
      if (isPage) this.#loadMore();
    });
    this.#initialFetch();
  }

  get $element() {
    return this.#$div;
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
    if (this.#isLoading) return;
    this.#main.removeSkeletons(this.#page);
    this.#page += 1;
    this.#isLoading = true;
    await this.#appendMovies();
    this.#isLoading = false;
  }

  async #appendMovies(): Promise<ResponseMovie | void> {
    this.#main.renderSkeletons(this.#page);

    try {
      if (this.#page > this.#totalPage) return;
      const response = await fetchSearchMovies(this.#getQuery(), this.#page);
      this.#totalPage = response.total_pages;
      if (response.results.length === 0) {
        this.#main.renderNothing();
        return response;
      }

      this.#main.renderMovies(response.results, this.#page);

      return response;
    } catch (error) {
      this.#handleError(error as Error);
      throw error;
    } finally {
      this.#main.removeSkeletons(this.#page);
    }
  }

  #handleError(error: Error) {
    this.#main.handleError(error);
  }

  #onSubmit = (query: string): void => {
    if (query.trim()) {
      dispatchRouteChange(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  #onDetail = async (movie_id: number) => {
    try {
      const movie = await fetchMovieDetails(movie_id);
      this.#$modal.open(movie);
    } catch (e) {}
  };
}
