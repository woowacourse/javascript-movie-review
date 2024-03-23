import { Movie } from './index.d';

import { SKELETON_UI_FIXED } from './constants';

import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import movieStore from './store/MovieStore';
import SearchBox from './components/SearchBox';
import searchMovieStore from './store/SearchMovieStore';

type Tpage = 'popular' | 'search';

export default class App {
  #pageType: Tpage = 'popular';

  async run() {
    this.#generateMovieList();
    this.#generateSearchBox();
    this.#addHomeButtonEvent();
  }

  // eslint-disable-next-line max-lines-per-function
  async #generateMovieList() {
    this.#changeTitle('지금 인기 있는 영화');
    this.#removePreviousError();
    const ulElement = document.querySelector('ul.item-list');

    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = await movieStore.getMovies(); //

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  async #generateSearchMovieList() {
    this.#changeTitle(`"${searchMovieStore.query}"  검색 결과`);
    this.#removePreviousError();
    const ulElement = document.querySelector('ul.item-list');

    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = await searchMovieStore.searchMovies();

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  #changeTitle(title: string) {
    const h2Element = document.querySelector('h2');
    if (h2Element) {
      h2Element.textContent = title;
    }
  }

  #appendMovieCard(newData: Movie[], ulElement: HTMLElement) {
    newData.forEach((movieData: Movie) => {
      const card = new MovieCard({
        movie: movieData,
      });

      ulElement?.appendChild(card.element);
    });
    this.#generateMoreButton();
  }

  #generateSkeletonUI(ulElement: HTMLElement) {
    this.#removeMoreButton();
    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard({
        classes: ['skeleton-container'],
      });

      ulElement?.appendChild(card.element);
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
        if (this.#pageType === 'popular') {
          movieStore.increasePageCount();
          this.#generateMovieList();
        } else {
          searchMovieStore.increasePageCount();
          this.#generateSearchMovieList();
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
      searchInputSubmit: (query: string) => {
        if (ulElement) ulElement.innerHTML = '';
        this.#pageType = 'search';
        searchMovieStore.query = query;
        this.#generateSearchMovieList();
      },
    });

    header?.appendChild(searchBox.element);
  }

  #addHomeButtonEvent() {
    const homeButton = document.getElementById('home-button');

    if (homeButton) {
      homeButton.addEventListener('click', () => {
        this.#pageType = 'popular';
        this.#changeTitle('지금 인기 있는 영화');
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
      }
    }
  }
}
