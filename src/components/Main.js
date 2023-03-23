import Movie from './MovieSummaryItem';
import { $ } from '../util/querySelector';

class Main {
  #element;
  #manager;
  #title;
  #list;
  #observer;

  constructor (element, manager) {
    this.#element = element;
    this.#manager = manager;

    this.#initializeElement();
  }

  async render () {
    const query = this.#manager.getQuery();

    if (this.#manager.getCurrentPage() === 1) {
      this.#list.replaceChildren();
    }

    if (!this.#observer) {
      this.#observer = new IntersectionObserver(this.#showMoreMoviesCallback.bind(this), { threshold: 0.2 });
      await this.#manager.searchMovieList(query);
    }

    this.#observer.disconnect();

    this.#title.textContent = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';

    const movieListFragment = document.createDocumentFragment();
    const movieList = this.#manager.getMovieList();

    if (!movieList.length && this.#manager.getCurrentPage() === 1) {
      const noSearchResult = document.createElement('p');
      noSearchResult.textContent = '검색 결과가 없습니다.';

      movieListFragment.appendChild(noSearchResult);
    }

    movieList.forEach((movieInfo) => movieListFragment.appendChild(new Movie(movieInfo).render()));

    this.#list.appendChild(movieListFragment);

    if (!this.#manager.isLastPage()) {
      this.#observer.observe($('li.movie-info:nth-last-child(6)', this.#list));
    }
  }

  #initializeElement () {
    const title = document.createElement('h2');

    const list = document.createElement('ul');
    list.setAttribute('class', 'item-list');

    this.#title = title;
    this.#list = list;

    this.#element.appendChild(title);
    this.#element.appendChild(list);
  }

  async #showMoreMoviesCallback (entries) {
    if (entries[0].intersectionRatio > 0.2) {
      this.#element.dispatchEvent(new CustomEvent('searchPending', { bubbles: true }));
      await this.#manager.getMoreMovieList();
      this.#element.dispatchEvent(new CustomEvent('searchFullfilled', { bubbles: true }));
    }
  }
}

export default Main;
