import { Movie } from './index.d';
import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard/MovieCard';
import movieStore from './store/MovieStore';
import SearchBox from './components/SearchBox';
import searchMovieStore from './store/SearchMovieStore';

const SKELETON_UI_FIXED = 8; // 스켈레톤 UI 갯수
const POPULAR = 'popular';
const SEARCH = 'search';

export default class App {
  #pageType = POPULAR;

  async run() {
    this.#generateMovieList();
    this.#generateSearchBox();
    this.#addHomeButtonEvent();
  }

  async #generateMovieList() {
    this.#changeTitle();
    this.#removePreviousError();
    const ulElement = document.querySelector('ul.item-list');
    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = this.#pageType === POPULAR ? await movieStore.getMovies() : await searchMovieStore.searchMovies();
      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  #changeTitle() {
    const h2Element = document.querySelector('h2');
    const title = this.#pageType === POPULAR ? '지금 인기 있는 영화' : `"${searchMovieStore.query}"  검색 결과`;
    if (h2Element) {
      h2Element.textContent = title;
    }
  }

  #appendMovieCard(newData: Movie[], ulElement: HTMLElement) {
    newData.forEach((movieData: Movie) => {
      const card = new MovieCard({
        movie: movieData,
      });

      ulElement.appendChild(card.element);
    });
    this.#generateMoreButton();
  }

  #generateSkeletonUI(ulElement: HTMLElement) {
    this.#removeMoreButton();
    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard({
        classes: ['skeleton-container'],
      });

      ulElement.appendChild(card.element);
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

  /* eslint-disable max-lines-per-function */
  #generateMoreButton() {
    this.#removeMoreButton();
    if (searchMovieStore.presentPage === searchMovieStore.totalPages) return;
    const itemView = document.querySelector('section.item-view');
    const moreBtn = new MoreButton({
      onClick: () => {
        if (this.#pageType === POPULAR) {
          movieStore.increasePageCount();
          this.#generateMovieList();
        } else {
          searchMovieStore.increasePageCount();
          this.#generateMovieList();
        }
      },
    });

    itemView?.appendChild(moreBtn.element);
  }

  #removeMoreButton() {
    const moreButton = document.getElementById('more-button');
    if (moreButton) {
      moreButton.parentNode?.removeChild(moreButton);
    }
  }

  #removePreviousError() {
    const previousError = document.getElementById('error-page');

    if (previousError) {
      previousError.parentNode?.removeChild(previousError);
    }
  }

  #generateSearchBox() {
    const header = document.querySelector('header');
    const ulElement = document.querySelector('ul.item-list');
    const searchBox = new SearchBox({
      onClick: (query: string) => {
        if (ulElement) ulElement.innerHTML = '';
        this.#pageType = SEARCH;
        searchMovieStore.query = query;
        this.#generateMovieList();
      },
    });

    header?.appendChild(searchBox.element);
  }

  #addHomeButtonEvent() {
    const homeButton = document.getElementById('home-button');

    if (homeButton) {
      homeButton.addEventListener('click', () => {
        this.#pageType = POPULAR;
        this.#changeTitle();
        this.#removePreviousError();
        this.#removeMoreButton();
        this.#renderAllMovieList();
      });
    }
  }

  #renderAllMovieList() {
    const movieDatas = movieStore.movies;
    if (!(movieDatas.length === 0)) {
      const ulElement = document.querySelector('ul.item-list');

      if (ulElement) {
        ulElement.innerHTML = '';
        this.#appendMovieCard(movieDatas, ulElement as HTMLElement);
        // }
      }
    }
  }
}
