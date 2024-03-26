import { MovieDataType } from '../api/apiType';
import { getPopularMovieList } from '../api/popularMovieList';
import SkeletonItem from './SkeletonItem';
import MovieItem from './MovieItem';
import { getSearchMovieList } from '../api/searchMovieList';
import { showAlert } from './Alert';
import { NO_SEARCH } from '../resource';
import ErrorPage from './ErrorPage';

class MovieContainer {
  #page;
  #query;

  constructor(element: HTMLElement) {
    this.#page = 1;
    this.#query = '';
    this.#getTemplate(element);
  }

  render(query: string) {
    this.initData(query);
    this.renderMovies();
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

  setEvent() {
    const moreButton = document.querySelector('.btn');
    moreButton?.addEventListener('click', () => {
      if (this.#page > 500) {
        moreButton?.classList.add('hidden');
        showAlert('마지막 페이지 입니다!', 3000);
        return;
      }

      this.renderMovies();
    });
  }

  async renderMovies() {
    this.#inputSkeleton();

    await this.#inputMovies();
  }

  async #inputMovies() {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#getMovies(this.#page, this.#query);

    if (movieData && !movieData.length) {
      ul.innerHTML = `<img src=${NO_SEARCH} class="error"/>`;
    }

    const viewMoreButton = document.querySelector('.btn');
    !movieData || movieData.length < 20
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

  async #getMovies(page: number, query: string) {
    try {
      const movieData = await (query ? getSearchMovieList(query, page) : getPopularMovieList(page));
      return movieData;
    } catch (error) {
      if (error instanceof Error) {
        this.#removeSkeleton();

        const [status, message] = error.message.split('-');

        if (status === 'Failed to fetch') {
          showAlert('네트워크 연결을 확인해주세요 🐣', 3000);
          throw new Error();
        }

        const ul = document.querySelector('ul.item-list');
        if (!(ul instanceof HTMLElement)) return;

        const viewMoreButton = document.querySelector('.btn');
        viewMoreButton?.classList.add('hidden');
        ul.innerHTML = ErrorPage({ status, message }).outerHTML;
      }
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

  #createMovieItems(data: MovieDataType[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }
}

export default MovieContainer;
