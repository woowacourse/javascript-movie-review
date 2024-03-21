import { MovieInfo } from '../api/api-type';
import { getPopularMovieList } from '../api/popularMovieList';
import SkeletonItem from './SkeletonItem';
import MovieItem from './MovieItem';
import { getSearchMovieList } from '../api/searchMovieList';

class MovieContainer {
  #page;
  #query;

  constructor(element: HTMLElement) {
    this.#page = 1;
    this.#query = '';
    this.#getTemplate(element);
    this.#setEvent();
    this.render(this.#query);
  }

  render(query: string) {
    this.initData(query);
    this.#query ? this.renderSearchMovies() : this.renderMovies();
  }

  initData(query: string) {
    const ul = document.querySelector('ul.item-list');
    const subtitle = document.querySelector('.subtitle');
    if (!(ul instanceof HTMLElement)) return;
    if (!(subtitle instanceof HTMLElement)) return;

    query
      ? (subtitle.textContent = `"${query}" 검색결과 입니다.`)
      : (subtitle.textContent = '지금 인기 있는 영화');

    this.#page = 1;
    this.#query = query;
    ul.innerHTML = '';
  }

  #getTemplate(element: HTMLElement) {
    const section = document.createElement('section');

    const h2 = document.createElement('h2');
    const movieList = document.createElement('ul');
    const button = document.createElement('button');

    h2.classList.add('subtitle');
    section.classList.add('item-view');
    movieList.classList.add('item-list');
    button.classList.add('btn', 'primary', 'full-width');

    button.textContent = '더 보기';

    section.appendChild(h2);
    section.appendChild(movieList);
    section.appendChild(button);

    element.appendChild(section);
  }

  #setEvent() {
    document.querySelector('.btn')?.addEventListener('click', () => {
      this.#query ? this.renderSearchMovies() : this.renderMovies();
    });
  }

  async renderMovies() {
    this.#inputSkeleton();

    await this.#inputMovies();
  }

  async renderSearchMovies() {
    this.#inputSkeleton();

    await this.#inputSearchMovies(this.#query);
  }

  async #inputSearchMovies(query: string) {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#searchMovies(this.#page, query);

    const viewMoreButton = document.querySelector('.btn');
    movieData && movieData.length < 20
      ? viewMoreButton?.classList.add('hidden')
      : viewMoreButton?.classList.remove('hidden');

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => {
        ul.appendChild(movieItem);
      });
      this.#removeSkeleton();
      this.#page += 1;
    }
  }

  #inputSkeleton() {
    const ul = document.querySelector('.item-list');
    if (!(ul instanceof HTMLElement)) return;

    Array.from({ length: 20 }).forEach(() => ul.insertAdjacentElement('beforeend', SkeletonItem()));
  }

  #removeSkeleton() {
    const skeletonItems = document.querySelectorAll('.skeleton-item');

    skeletonItems.forEach((item) => item?.remove());
  }

  async #getMovies(page: number) {
    const movieData = await getPopularMovieList(page);
    return movieData;
  }

  async #searchMovies(page: number, query: string) {
    const movieData = await getSearchMovieList(query, page);
    return movieData;
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  async #inputMovies() {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#getMovies(this.#page);

    const viewMoreButton = document.querySelector('.btn');
    movieData && movieData.length < 20
      ? viewMoreButton?.classList.add('hidden')
      : viewMoreButton?.classList.remove('hidden');

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => {
        ul.appendChild(movieItem);
      });

      this.#removeSkeleton();

      this.#page += 1;
    }
  }
}

export default MovieContainer;
