import SkeletonItem from './SkeletonItem/SkeletonItem';
import MovieItem from './MovieItem/MovieItem';
import { showAlert } from './Alert/Alert';
import { NO_SEARCH } from '../resource';
import ErrorPage from './ErrorPage/ErrorPage';
import Movies, { MovieInfo } from '../domain/Movies';

class MovieContainer {
  #page;
  #query;
  #movies;

  constructor(element: HTMLElement) {
    this.#page = 1;
    this.#query = '';
    this.#movies = new Movies();
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

    const subtitle = document.createElement('h2');
    const movieList = document.createElement('ul');
    const button = document.createElement('button');

    subtitle.classList.add('subtitle');
    section.classList.add('item-view');
    movieList.classList.add('item-list');
    button.classList.add('btn', 'primary', 'full-width');

    button.textContent = '더 보기';

    section.appendChild(subtitle);
    section.appendChild(movieList);
    section.appendChild(button);

    element.appendChild(section);
  }

  #setEvent() {
    const moreButton = document.querySelector('.btn');
    moreButton?.addEventListener('click', () => {
      if (this.#page > 500) {
        const viewMoreButton = document.querySelector('.btn');
        viewMoreButton?.classList.add('hidden');

        showAlert('마지막 페이지 입니다!');
        return;
      }

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
    try {
      const movieData = await this.#movies.getPopularMovies(page);
      return movieData;
    } catch (error) {
      if (error instanceof Error) {
        const [status, message] = error.message.split('-');
        const ul = document.querySelector('ul.item-list');
        if (!(ul instanceof HTMLElement)) return;

        const viewMoreButton = document.querySelector('.btn') as HTMLElement;
        viewMoreButton.classList.add('hidden');

        ul.innerHTML = ErrorPage({ status, message }).outerHTML;
      }
    }
  }

  async #searchMovies(page: number, query: string) {
    try {
      const movieData = await this.#movies.getSearchMovies(query, page);

      return movieData;
    } catch (error) {
      if (error instanceof Error) {
        this.#removeSkeleton();
        const [status, message] = error.message.split('-');
        const ul = document.querySelector('ul.item-list');
        if (!(ul instanceof HTMLElement)) return;

        const viewMoreButton = document.querySelector('.btn');
        viewMoreButton?.classList.add('hidden');
        ul.innerHTML = ErrorPage({ status, message }).outerHTML;
      }
    }
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  async #inputMovies() {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#getMovies(this.#page);

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
}

export default MovieContainer;
