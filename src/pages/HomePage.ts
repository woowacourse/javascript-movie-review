import Header from '../components/header/TopRateHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchPopularMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import TMDBError from '../api/TMDBError.ts';
import { CUSTOM_EVENT, dispatchRouteChange } from '../utils/event.ts';
import Modal from '../components/modal/Modal.ts';

export default class HomePage {
  #$fragment: DocumentFragment;
  #page: number = 1;
  #header: Header;
  #main: Main;
  #footer: Footer;
  #$modal: Modal;

  constructor(modal: Modal) {
    this.#$modal = modal;
    this.#$fragment = document.createDocumentFragment();
    this.#header = new Header(this.#onSubmit);
    this.#main = new Main('지금 인기있는 영화', this.#onDetail);
    this.#footer = new Footer();

    this.#$fragment.append(this.#header.$element, this.#main.$element, this.#footer.$element);

    window.addEventListener(CUSTOM_EVENT.SCROOL_END, () => this.#loadMore());

    this.#initialFetch();
  }

  get $element() {
    return this.#$fragment;
  }

  async #initialFetch() {
    try {
      const response = await this.#appendMovies();
      this.#header.render(response.results[0]);
    } catch (error) {
      this.#handleError(error);
    }
  }

  async #loadMore() {
    this.#page += 1;
    await this.#appendMovies();
  }

  async #appendMovies(): Promise<ResponseMovie> {
    this.#main.renderSkeletons(this.#page);
    try {
      const response = await fetchPopularMovies(this.#page);
      this.#main.renderMovies(response.results, this.#page);

      return response;
    } catch (error) {
      this.#handleError(error);
      throw error;
    } finally {
      this.#main.removeSkeletons(this.#page);
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
