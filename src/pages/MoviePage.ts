import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';
import Modal from '../components/modal/Modal.ts';

import { MovieDetail, ResponseMovie } from '../api/types.ts';
import LocalStorage from '../storage/LocalStorage.ts';

type PageOption = {
  fetchMovie: (page: number) => Promise<ResponseMovie>;
  fetchDetail: (movie_id: number) => Promise<MovieDetail>;
  $header: Element;
  title: string;
  onInitHeader?: (res: ResponseMovie) => void;
};

export default class MoviePage {
  #$div: HTMLElement;
  #$main: Main;
  #$modal: Modal;

  #totalPage: number;
  #page: number;
  #option: PageOption;

  #observer: IntersectionObserver;

  constructor(option: PageOption) {
    this.#page = 1;
    this.#totalPage = 1;
    this.#option = option;

    this.#$div = document.createElement('div');
    this.#$main = new Main(this.#option.title, this.#onDetail.bind(this));
    this.#$modal = new Modal(new LocalStorage(), this.#$div);

    const footer = new Footer();
    this.#$div.append(this.#option.$header, this.#$main.$element, footer.$element, this.#$modal.$element);

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

  async #fetchMovie(): Promise<ResponseMovie | void> {
    if (this.#page > this.#totalPage) return;
    const response = await this.#option.fetchMovie(this.#page);
    this.#page += 1;
    this.#totalPage = response.total_pages;
    return response;
  }

  async #initialFetch(): Promise<void> {
    try {
      this.#$main.renderSkeletons();
      const response = await this.#fetchMovie();
      if (!response) return;

      const { onInitHeader } = this.#option;
      if (onInitHeader) onInitHeader(response);

      const lastElement = this.#appendMovies(response);
      if (lastElement) this.#observer.observe(lastElement);
    } catch (error) {
      this.#handleError(error);
    } finally {
      this.#$main.removeSkeletons();
    }
  }

  async #loadMore(): Promise<void> {
    this.#observer.disconnect();
    try {
      this.#$main.renderSkeletons();
      const response = await this.#fetchMovie();
      if (!response) return;

      const lastElement = this.#appendMovies(response);
      if (lastElement) this.#observer.observe(lastElement);
    } catch (error) {
      this.#handleError(error);
    } finally {
      this.#$main.removeSkeletons();
    }
  }

  #appendMovies(response: ResponseMovie): Element | null {
    return this.#$main.renderMovies(response.results);
  }

  #handleError(error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      this.#$main.handleError(error);
    }
  }

  async #onDetail(movie_id: number) {
    try {
      const movie = await this.#option.fetchDetail(movie_id);
      this.#$modal.open(movie);
    } catch (error) {
      this.#handleError(error as Error);
    }
  }
}
