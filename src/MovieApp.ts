import { LOGO, STAR_EMPTY, STAR_FILLED } from './resource/index';
import { STAR_MESSAGE } from './constants/messages';
import { $ } from './utils/dom';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';
import MovieListSection from './components/MovieListSection/MovieListSection';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import MovieDetail from './components/MovieDetail/MovieDetail';

import MovieController from './controller/MovieController';

class MovieApp {
  #app = document.getElementById('app');
  #movieController;
  #modal;

  constructor() {
    this.#movieController = new MovieController();
    this.#modal = new ModalWrapper();
  }

  init() {
    if (!(this.#app instanceof HTMLElement)) {
      return;
    }

    this.#app.appendChild(this.#setHeader());
    this.#addSearchButtonHoverEvent();
    this.#app.appendChild(this.#setMain());
    this.#app.appendChild(this.#modal.element);
    this.#movieController.render('');
  }

  #setHeader() {
    const logo = this.#setLogo();
    const title = Title({ element: logo, onClick: () => this.#onHomeButtonClick() });
    const searchBox = SearchBox({ searchHandler: () => this.#onSearchHandler() });
    const header = Header({ title: title, searchBox: searchBox });

    return header;
  }

  #setLogo() {
    const logo = document.createElement('img');

    logo.src = LOGO;
    logo.setAttribute('alt', 'MovieList 로고');

    return logo;
  }

  #setMain() {
    const main = document.createElement('main');
    const movieListSection = MovieListSection({
      onMovieClick: (event: MouseEvent) => this.#onMovieClick(event),
    });

    main.appendChild(movieListSection);

    return main;
  }

  #onSearchHandler() {
    const searchInput = $('#search-text') as HTMLInputElement;

    this.#movieController.render(searchInput.value);
    searchInput.value = '';
  }

  #onHomeButtonClick() {
    this.#movieController.render();
  }

  async #onMovieClick(event: MouseEvent) {
    const target = event.target as Element;
    const li = target.closest('li.movie-item') as HTMLLIElement;
    if (!li) return;

    this.#modal.toggle();

    const movieId = Number(li.dataset.movieId);
    const data = await this.#movieController.handleMovieClick(movieId);
    const movieDetail = MovieDetail({
      data,
      onCloseButtonClick: () => this.#modal.toggle(),
    });

    this.#modal.replaceContent(movieDetail);
    this.#addStarHoverEvent();
  }

  #addStarHoverEvent() {
    $('.stars')?.addEventListener('mouseover', (event: Event) => {
      const stars = document.querySelectorAll('.star') as NodeListOf<HTMLImageElement>;
      const target = event.target as HTMLElement;
      const targetStar = target.closest('.star') as HTMLImageElement;
      if (!targetStar) return;
      const gradeElement = $('.review-rating') as HTMLSpanElement;
      const gradeText = $('.review-text') as HTMLSpanElement;
      const starIndex = Number(targetStar.dataset?.starIndex);
      const grade = (starIndex + 1) * 2 - 2;

      stars.forEach((star, index) => {
        if (index <= starIndex) star.src = STAR_FILLED;
      });

      gradeElement.textContent = String(grade);
      gradeText.textContent = STAR_MESSAGE[grade];
    });

    $('.stars')?.addEventListener('mouseout', (event: Event) => {
      const stars = document.querySelectorAll('.star') as NodeListOf<HTMLImageElement>;
      const target = event.target as HTMLElement;
      const targetStar = target.closest('.star') as HTMLImageElement;
      if (!targetStar) return;
      const gradeElement = $('.review-rating') as HTMLSpanElement;
      const gradeText = $('.review-text') as HTMLSpanElement;
      const starIndex = Number(targetStar.dataset?.starIndex);
      const grade = (starIndex + 1) * 2 - 2;

      stars.forEach((star, index) => {
        if (index >= starIndex) star.src = STAR_EMPTY;
      });

      gradeElement.textContent = String(grade);
      gradeText.textContent = STAR_MESSAGE[grade];
    });
  }

  #addSearchButtonHoverEvent() {
    $('.search-box')?.addEventListener('mouseover', () => {
      const searchInput = $('#search-text') as HTMLInputElement;
      const searchButton = $('.search-button') as HTMLButtonElement;

      searchButton.style.pointerEvents = 'auto';

      if (window.innerWidth <= 673) {
        $('.title')?.classList.add('visibility-hidden');
        searchInput.classList.add('show-input');
      }
    });

    $('.search-box')?.addEventListener('mouseout', () => {
      const searchInput = $('#search-text') as HTMLInputElement;
      const searchButton = $('.search-button') as HTMLButtonElement;

      if (window.innerWidth <= 673) {
        $('.title')?.classList.remove('visibility-hidden');
        searchInput.classList.remove('show-input');
        searchButton.style.pointerEvents = 'none';
      } else {
        searchButton.style.pointerEvents = 'auto';
      }
    });
  }
}

export default MovieApp;
