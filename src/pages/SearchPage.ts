import Header from '../components/header/SearchHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchSearchMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import Modal from '../components/modal/Modal.ts';

export default class SearchPage {
  #$div: HTMLElement;
  #main: Main;
  #$modal: Modal;

  #totalPage: number;
  #page: number;

  #observer: IntersectionObserver;

  constructor(modal: Modal) {
    this.#page = 1;
    this.#totalPage = 1;
    this.#$modal = modal;

    const query = this.#getQuery();

    this.#$div = document.createElement('div');
    this.#$div.id = `${query}`;
    const header = new Header(this.#onSubmit);
    this.#main = new Main(`"${query}" 검색 결과`, this.#onDetail);
    const footer = new Footer();

    this.#$div.append(header.$element, this.#main.$element, footer.$element);

    this.#observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.#loadMore();
        }
      },
      { threshold: 0.1 },
    );
    this.#initialFetch();
  }

  get $element() {
    return this.#$div;
  }

  async #fetchSearchMovies(): Promise<ResponseMovie | void> {
    if (this.#page > this.#totalPage) return;
    const response = await fetchSearchMovies(this.#getQuery(), this.#page);
    this.#page += 1;
    this.#totalPage = response.total_pages;
    return response;
  }

  // 차이점 1
  #getQuery(): string {
    const [, queryString = ''] = window.location.hash.split('?');
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('query') ?? '';
  }

  async #initialFetch(): Promise<void> {
    try {
      this.#main.renderSkeletons();
      const response = await this.#fetchSearchMovies();
      if (!response) return;

      // this.#header.render(response.results[0]); 차이점2
      const lastElement = this.#appendMovies(response);
      if (lastElement) this.#observer.observe(lastElement);
    } catch (error) {
      this.#handleError(error);
    } finally {
      this.#main.removeSkeletons();
    }
  }

  async #loadMore(): Promise<void> {
    this.#observer.disconnect();
    this.#main.renderSkeletons();
    try {
      const response = await this.#fetchSearchMovies();
      if (!response) return;

      const lastElement = this.#appendMovies(response);
      if (lastElement) this.#observer.observe(lastElement);
    } catch (error) {
      this.#handleError(error);
    } finally {
      this.#main.removeSkeletons();
    }
  }
  #appendMovies(response: ResponseMovie): Element | null {
    return this.#main.renderMovies(response.results);
  }

  #handleError(error: unknown) {
    if (error instanceof Error) {
      this.#main.handleError(error);
    }
  }

  #onSubmit = (query: string): void => {
    if (query.trim()) {
      location.hash = `/search?query=${encodeURIComponent(query)}`;
    }
  };

  #onDetail = async (movie_id: number) => {
    try {
      const movie = await fetchMovieDetails(movie_id);
      this.#$modal.open(movie);
    } catch (error) {
      this.#handleError(error as Error);
    }
  };
}
