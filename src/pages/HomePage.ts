import Header from '../components/header/TopRateHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchPopularMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import { CUSTOM_EVENT, dispatchRouteChange } from '../utils/event.ts';
import Modal from '../components/modal/Modal.ts';

export default class HomePage {
  #$div: HTMLElement;

  #page: number;
  #totalPage: number;

  #header: Header;
  #main: Main;
  #footer: Footer;
  #$modal: Modal;
  #isLoading: boolean;

  constructor(modal: Modal) {
    this.#$modal = modal;
    this.#isLoading = false;
    this.#totalPage = 1;
    this.#page = 1;

    this.#$div = document.createElement('div');
    this.#$div.id = 'homepage';

    this.#header = new Header(this.#onSubmit);
    this.#main = new Main('지금 인기있는 영화', this.#onDetail);
    this.#footer = new Footer();

    this.#$div.append(this.#header.$element, this.#main.$element, this.#footer.$element);

    window.addEventListener(CUSTOM_EVENT.SCROLL_END, () => {
      const isPage = window.document.querySelector('#homepage');
      if (isPage) this.#loadMore();
    });

    this.#initialFetch();
  }

  get $element() {
    return this.#$div;
  }

  async #initialFetch() {
    try {
      const response = await this.#appendMovies();
      if (response) {
        this.#header.render(response.results[0]);
      }
    } catch (error) {
      this.#handleError(error as Error);
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
      const response = await fetchPopularMovies(this.#page);
      this.#totalPage = response.total_pages;
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
