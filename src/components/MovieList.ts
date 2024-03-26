import { Movie } from '../index.d';
import movieStore from '../store/MovieStore';
import searchMovieStore from '../store/SearchMovieStore';
import MoreButton from './MoreButton';
import MovieCard from './MovieCard/MovieCard';

const SKELETON_UI_FIXED = 8; // 스켈레톤 UI 갯수
const POPULAR = 'popular';
const SEARCH = 'search';

export default class MovieList {
  #ulElement = document.createElement('ul');

  #listType = POPULAR;

  constructor() {
    this.#ulElement.classList.add('item-list');
    this.generateMovieList();
  }

  async generateMovieList() {
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
      this.#ulElement.innerHTML = '';
      this.#appendMovieCard(movieDatas);
    }
  }

  renderSearchList(query: string) {
    searchMovieStore.query = query;
    this.#ulElement.innerHTML = '';
    this.#listType = SEARCH;
    this.generateMovieList();
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
    this.#removeMoreButton();
    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard({
        classes: ['skeleton-container'],
      });

      this.#ulElement.appendChild(card.element);
    }
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
    this.#generateMoreButton();
  }

  #removeMoreButton() {
    const moreButton = document.getElementById('more-button');
    if (moreButton) {
      moreButton.parentNode?.removeChild(moreButton);
    }
  }

  #generateMoreButton() {
    this.#removeMoreButton();
    if (searchMovieStore.presentPage === searchMovieStore.totalPages) return;
    const itemView = document.querySelector('section.item-view');
    const moreBtn = new MoreButton({
      onClick: () => {
        if (this.#listType === POPULAR) {
          movieStore.increasePageCount();
          this.generateMovieList();
        } else {
          searchMovieStore.increasePageCount();
          this.generateMovieList();
        }
      },
    });

    itemView?.appendChild(moreBtn.element);
  }

  get element() {
    return this.#ulElement;
  }
}
