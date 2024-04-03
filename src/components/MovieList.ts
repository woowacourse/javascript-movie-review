import { Movie } from '../index.d';
import InfiniteScrollService from '../service/InfiniteScroll';
import movieStore from '../store/MovieStore';
import searchMovieStore from '../store/SearchMovieStore';
import MovieCard from './MovieCard/MovieCard';

const SKELETON_UI_FIXED = 8; // 스켈레톤 UI 갯수
const POPULAR = 'popular';
const SEARCH = 'search';

export default class MovieList {
  #ulElement = document.createElement('ul');

  #listType = POPULAR;

  constructor() {
    this.#ulElement.classList.add('item-list');
    this.#infiniteScroll();
  }

  async #infiniteScroll() {
    const target = document.querySelector('.list-end') as HTMLElement;

    if (target) {
      InfiniteScrollService.initObserver(target, () => {
        this.generateMovieList();
      });
    }
  }

  async generateMovieList() {
    if (this.#listType === SEARCH && searchMovieStore.presentPage > searchMovieStore.totalPages) return;
    this.#changeTitle();
    this.#removePreviousError();
    this.#generateSkeletonUI();
    const newData = this.#listType === POPULAR ? await movieStore.getMovies() : await searchMovieStore.searchMovies();
    this.#removeSkeletonUI();
    this.#appendMovieCard(newData);
  }

  renderPreviousPopularList() {
    const movieDatas = movieStore.movies;
    if (!(movieDatas.length === 0)) {
      this.#listType = POPULAR;
      this.#changeTitle();
      this.#ulElement.innerHTML = '';
      this.#appendMovieCard(movieDatas);
    }
  }

  renderSearchList(query: string) {
    searchMovieStore.query = query;
    this.#ulElement.innerHTML = '';
    this.#listType = SEARCH;
  }

  #changeTitle() {
    const h2Element = document.querySelector('h2');
    const title = this.#listType === POPULAR ? '지금 인기 있는 영화' : `"${searchMovieStore.query}"  검색 결과`;
    if (h2Element) {
      h2Element.textContent = title;
    }
  }

  #removePreviousError() {
    const previousError = document.getElementById('error-page');

    if (previousError) {
      previousError.parentNode?.removeChild(previousError);
    }
  }

  #generateSkeletonUI() {
    const fragment = new DocumentFragment();

    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard({
        classes: ['skeleton-container'],
      });

      fragment.append(card.element);
    }
    this.#ulElement.append(fragment);
  }

  #removeSkeletonUI() {
    const skeletonElements = document.querySelectorAll('.skeleton-container');

    if (skeletonElements) {
      skeletonElements.forEach((skeletonElement) => {
        skeletonElement.parentNode?.removeChild(skeletonElement);
      });
    }
  }

  #appendMovieCard(newData: Movie[]) {
    newData.forEach((movieData: Movie) => {
      const card = new MovieCard({
        movie: movieData,
      });

      this.#ulElement.appendChild(card.element);
    });
  }

  get element() {
    return this.#ulElement;
  }
}
