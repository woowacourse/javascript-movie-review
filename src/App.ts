import { Movie } from './index.d';

import { SKELETON_UI_PC, SKELETON_UI_TABLET, SKELETON_UI_MOBILE, MOBILE_SIZE, TABLET_SIZE } from './constants';

import movieStore from './store/MovieStore';
import searchMovieStore from './store/SearchMovieStore';

import SearchBox from './components/SearchBox';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';

import Logo from './images/logo.png';

type Tpage = 'popular' | 'search';

export default class App {
  #pageType: Tpage = 'popular';

  #observer: IntersectionObserver | null = null;

  #isLoading: boolean = false;

  #skeletonBySize: number = SKELETON_UI_PC;

  async run() {
    this.#insertLogo();
    this.#generateMovieList();
    this.#generateSearchBox();
    this.#addHomeButtonEvent();
    this.#initEventListeners();
    this.#setupIntersectionObserver();
  }

  #insertLogo() {
    const homeButton = document.getElementById('home-button');
    const imgElement = document.createElement('img');

    imgElement.src = Logo;
    imgElement.alt = 'MovieList 로고';

    homeButton?.appendChild(imgElement);
  }

  #getSkeletonCount() {
    const width = window.innerWidth;

    if (width <= MOBILE_SIZE) {
      return SKELETON_UI_MOBILE;
    }
    if (width <= TABLET_SIZE) {
      return SKELETON_UI_TABLET;
    }
    return this.#skeletonBySize;
  }

  #generateMovieList() {
    this.#generateItemList('지금 인기 있는 영화', async () => await movieStore.getMovies(), movieStore);
  }

  #generateSearchMovieList() {
    this.#generateItemList(
      `"${searchMovieStore.query}"  검색 결과`,
      async () => await searchMovieStore.searchMovies(),
      searchMovieStore,
    );
  }

  // eslint-disable-next-line max-lines-per-function
  async #generateItemList(title: string, fetchData: () => Promise<Movie[]>, store: any) {
    this.#changeTitle(title);
    this.#removePreviousError();

    const ulElement = document.querySelector('ul.item-list');

    if (ulElement) {
      const skeletonCount = this.#getSkeletonCount();
      this.#generateSkeletonUI(ulElement as HTMLElement, skeletonCount);

      const newData = await fetchData();

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);

      this.#observeSentinel();
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
  }

  #generateSkeletonUI(ulElement: HTMLElement, skeletonCount: number) {
    const fragment = new DocumentFragment();

    for (let i = 0; i < skeletonCount; i++) {
      const card = new MovieCard({
        classes: ['skeleton-container'],
      });
      fragment.appendChild(card.element);
    }

    ulElement?.appendChild(fragment);
  }

  #removeSkeletonUI() {
    const skeletonElements = document.querySelectorAll('.skeleton-container');

    if (skeletonElements) {
      skeletonElements.forEach((skeletonElement) => {
        skeletonElement.parentNode?.removeChild(skeletonElement);
      });
    }
  }

  #setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    this.#observer = new IntersectionObserver(this.#handleIntersection, options);
    const sentinel = document.createElement('li');
    sentinel.classList.add('sentinel');
    this.#observer.observe(sentinel);
  }

  #observeSentinel() {
    const sentinel = document.querySelector('.sentinel');
    if (sentinel && this.#observer) {
      this.#observer.observe(sentinel);
    }
  }

  #handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !this.#isLoading) {
        this.#loadMoreMovies();
      }
    });
  };

  // eslint-disable-next-line max-lines-per-function
  async #loadMoreMovies() {
    if (searchMovieStore.presentPage === searchMovieStore.totalPages) return;

    this.#isLoading = true;

    if (this.#pageType === 'popular') {
      await movieStore.increasePageCount();
      await this.#generateMovieList();
    } else {
      await searchMovieStore.increasePageCount();
      await this.#generateSearchMovieList();
    }

    this.#isLoading = false;
  }

  #removePreviousError() {
    const previousError = document.getElementById('error-page');

    if (previousError) {
      previousError.parentNode?.removeChild(previousError);
    }
  }

  // eslint-disable-next-line max-lines-per-function
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
        this.#renderAllMovieList();
      });
    }
  }

  #renderAllMovieList() {
    const movieDatas = movieStore.movies;
    if (movieDatas.length === 0) return;

    const ulElement = document.querySelector('ul.item-list');
    if (!ulElement) return;

    ulElement.innerHTML = '';
    this.#appendMovieCard(movieDatas, ulElement as HTMLElement);
    this.#observeSentinel();
  }

  #initEventListeners() {
    const itemList = document.querySelector('ul.item-list');

    if (itemList) {
      itemList.addEventListener('click', this.#handleMovieCardClick.bind(this));
    }
  }

  #handleMovieCardClick(event: any) {
    const clickedElement = event.target.closest('.item-card');

    if (clickedElement) {
      const movieId = Number(clickedElement.dataset.movieid);
      const modal = Modal.getInstance(movieId);
      modal.openModal();
    }
  }
}
