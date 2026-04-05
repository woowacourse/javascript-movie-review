import Header from '../components/header/TopRateHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchPopularMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/type.ts';

export default class HomePage {
  #$target: Element;
  #page: number = 1;
  #main = new Main('지금 인기있는 영화');

  constructor($target: Element) {
    this.#$target = $target;
  }

  async init() {
    const header = new Header();
    this.#main = new Main('지금 인기있는 영화');
    const footer = new Footer();

    this.#$target.append(header.$element, this.#main.$element, footer.$element);

    const response = await this.#appendMovies();
    header.render(response.results[0]);
    this.#main.renderMoreButton(() => this.#loadMore());
  }

  async #loadMore() {
    this.#page += 1;
    await this.#appendMovies();
  }

  async #appendMovies(): Promise<ResponseMovie> {
    const $skeletons = this.#main.renderSkeletons();

    try {
      const response = await fetchPopularMovies(this.#page);
      this.#main.renderMovies(response.results);

      if (response.page >= response.total_pages) {
        this.#main.removeMoreButton();
      }

      return response;
    } catch (error) {
      // this.#main.renderError();
      throw error;
    } finally {
      $skeletons.forEach(($s) => $s.remove());
    }
  }
}
