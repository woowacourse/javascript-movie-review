import Header from '../components/header/TopRateHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchPopularMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import TMDBError from '../api/TMDBError.ts';
import { dispatchRouteChange } from '../utils/event.ts';

export default class HomePage {
  #$target: Element;
  #page: number = 1;
  #main: Main;

  constructor($target: Element) {
    this.#$target = $target;
    this.#main = new Main('');
  }

  async init() {
    const header = new Header(this.#onSubmit);
    this.#main = new Main('지금 인기있는 영화');
    const footer = new Footer();

    this.#$target.append(header.$element, this.#main.$element, footer.$element);

    const response = await this.#appendMovies();
    header.render(response.results[0]);
  }

  async #loadMore() {
    this.#main.removeMoreButton();
    this.#page += 1;
    await this.#appendMovies();
  }

  async #appendMovies(): Promise<ResponseMovie> {
    this.#main.renderSkeletons();
    try {
      const response = await fetchPopularMovies(this.#page);
      this.#main.renderMovies(response.results);

      if (this.#page < response.total_pages) {
        this.#main.renderMoreButton(() => this.#loadMore());
      }
      return response;
    } catch (error) {
      if (error instanceof TMDBError) {
        this.#main.renderError('TMDB에러입니다 ' + error.message);
        throw error;
      }
      this.#main.renderError(('알수없는 에러입니다\n' + (error as Error).message) as string);
      throw error;
    } finally {
      this.#main.removeSkeletons();
    }
  }

  #onSubmit = (query: string): void => {
    if (query.trim()) {
      dispatchRouteChange(`/search?query=${encodeURIComponent(query)}`);
    }
  };
}
