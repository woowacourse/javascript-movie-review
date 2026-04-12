import Header from '../components/header/TopRateHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchMovieDetails, fetchPopularMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import Modal from '../components/modal/Modal.ts';

export default class HomePage {
  #page: number;
  #totalPage: number;

  #$div: HTMLElement;
  #header: Header;
  #main: Main;
  #footer: Footer;
  #$modal: Modal;

  #observer: IntersectionObserver;

  constructor(modal: Modal) {
    this.#$modal = modal;
    this.#totalPage = 1;
    this.#page = 1;

    this.#$div = document.createElement('div');
    this.#$div.id = 'homepage';

    this.#header = new Header(this.#onSubmit);
    this.#main = new Main('지금 인기있는 영화', this.#onDetail);
    this.#footer = new Footer();

    this.#$div.append(this.#header.$element, this.#main.$element, this.#footer.$element);

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

  async #fetchPopularMovies(): Promise<ResponseMovie | void> {
    if (this.#page > this.#totalPage) return;
    const response = await fetchPopularMovies(this.#page);
    this.#page += 1;
    this.#totalPage = response.total_pages;
    return response;
  }

  async #initialFetch(): Promise<void> {
    try {
      this.#main.renderSkeletons();
      const response = await this.#fetchPopularMovies();
      if (!response) return;

      this.#header.render(response.results[0]);
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
      const response = await this.#fetchPopularMovies();
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
      this.#$modal.renderSkeleton();
      const movie = await fetchMovieDetails(movie_id);
      this.#$modal.open(movie);
    } catch (error) {
      this.#handleError(error as Error);
    }
  };
}
