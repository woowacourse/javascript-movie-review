import Header from '../components/header/SearchHeader.ts';
import Main from '../components/main/Main.ts';
import Footer from '../components/footer/Footer.ts';

import { fetchSearchMovies } from '../api/fetchApi.ts';
import { ResponseMovie } from '../api/types.ts';
import TMDBError from '../api/TMDBError.ts';
import { dispatchRouteChange } from '../utils/event.ts';
export default class SearchPage {
  #$target: Element;
  #page: number = 1;
  #main: Main;

  constructor($target: Element) {
    this.#$target = $target;
    this.#main = new Main('');
  }

  getQuery(): string {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    return query ?? '';
  }

  async init() {
    const header = new Header(this.#onSubmit);
    this.#main = new Main(`"${this.getQuery()}" 검색 결과`);
    const footer = new Footer();

    this.#$target.append(header.$element, this.#main.$element, footer.$element);
    await this.#appendMovies();
  }

  async #loadMore() {
    this.#main.removeMoreButton();
    this.#page += 1;
    await this.#appendMovies();
  }

  async #appendMovies(): Promise<ResponseMovie> {
    this.#main.renderSkeletons();

    try {
      const response = await fetchSearchMovies(this.getQuery(), this.#page);
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
      if (error instanceof TMDBError) {
        this.#main.renderError('TMDB에러입니다\n' + error.message);
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
