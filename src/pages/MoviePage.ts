import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';
import Modal from '../components/modal/Modal.ts';

import { MovieDetail, ResponseMovie } from '../api/types.ts';
import LocalStorage from '../storage/LocalStorage.ts';
import Header from '../components/header/Header.ts';
import { MovieStore } from '../storage/types.ts';

type PageOption = {
  type: 'home' | 'search';
  fetchMovie: (page: number) => Promise<ResponseMovie>;
  fetchDetail: (movie_id: number) => Promise<MovieDetail>;
  onSubmit: (query: string) => void;
  query?: string;
  movieDB: MovieStore;
};

export default class MoviePage {
  #$div: HTMLElement;
  #$header: Header;
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
    this.#$header = new Header(option.onSubmit.bind(this), this.#onDetail.bind(this));
    const title = option.type === 'home' ? '지금 인기있는 영화' : `"${option.query}" 검색 결과`;
    this.#$main = new Main(title, this.#onDetail.bind(this));
    this.#$modal = new Modal(option.movieDB, this.#$div);

    const footer = new Footer();
    this.#$div.append(this.#$header.$element, this.#$main.$element, footer.$element, this.#$modal.$element);

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
    if (response.results.length === 0) {
      this.#$main.renderNothing();
      return;
    }
    this.#page += 1;
    this.#totalPage = response.total_pages;
    return response;
  }

  async #initialFetch(): Promise<void> {
    try {
      this.#$main.renderSkeletons();
      const response = await this.#fetchMovie();
      if (!response) return;

      if (this.#option.type === 'home') this.#$header.showBanner(response.results[0]);

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
      this.#$modal.renderSkeleton();
      const movie = await this.#option.fetchDetail(movie_id);
      this.#$modal.open(movie);
    } catch (error) {
      console.error(error);
      alert('모달 에러입니다.');
      this.#handleError(error as Error);
    }
  }
}
