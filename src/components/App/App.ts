import './App.css';

import LOGO from '../../assets/images/logo.png';
import { dom } from '../../utils/dom';
import Header from '../header/Header';
import MovieListContainer from '../movieListContainer/MovieListContainer';
import Button from '../common/button/Button';
import Toast from '../common/Toast';
import CONFIG from '../../constants/config';
import { MESSAGE } from '../../constants/message';
import movieInfo from '../../domain/movieInfo';

class App {
  $target: HTMLElement;
  movieListContainer: MovieListContainer;
  toast: Toast = new Toast();

  constructor() {
    this.$target = document.createElement('div');
    this.$target.id = 'app';
    this.$target.innerHTML = this.template();
    this.movieListContainer = new MovieListContainer();

    this.render();
    this.setEvent();
  }

  template() {
    return /*html*/ `
    <main>
      <section class="item-view">
        <h2 id="title">${MESSAGE.HOME_TITLE}</h2>
        <slot class="slot-movie-list"></slot>
      </section>
    </main>
    `;
  }

  render() {
    const $section = dom.getElement(this.$target, '.item-view');
    const $title = dom.getElement(this.$target, '#title');
    const $movieListSlot = dom.getElement(this.$target, '.slot-movie-list');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const title = urlSearchParams.get('title') ?? '';

    this.#renderHeader();
    this.#renderMoreButton($section);
    $section.appendChild(this.toast.$target);
    $title.textContent = title ? MESSAGE.SEARCH_FOUND_TITLE(title) : MESSAGE.HOME_TITLE;
    $movieListSlot.replaceWith(this.movieListContainer.$target);
  }

  setEvent() {
    const $toastButton = dom.getElement<HTMLButtonElement>(document.body, '#toast-button');
    $toastButton.addEventListener<any>('onToast', (e: CustomEvent) => {
      const message = e.detail;
      this.toast.on(message);
    });

    this.#handleInfinityScroll();
  }

  #createHeader() {
    return new Header({
      imageSrc: LOGO,
      onSubmit: async (e: SubmitEvent) => {
        e.preventDefault();
        const $input = dom.getElement<HTMLInputElement>(this.$target, '#search-input');

        if ($input.offsetWidth === 0) {
          this.#handleClickMiniSearchButton();
          return;
        }
        if (!$input.value) return;
        history.pushState('', '', `?mode=search&title=${$input.value}`);

        this.movieListContainer.initPageNumber();
        const { movies, totalPages, movieCount } = await this.movieListContainer.fetchMovies(CONFIG.FIRST_PAGE);
        this.updateTitle(movieCount, $input.value);
        this.movieListContainer.paint(movieInfo.createAll(movies), totalPages);
      },
    });
  }

  #renderHeader() {
    const header = this.#createHeader();
    this.$target.prepend(header.$target);
  }

  #renderMoreButton($section: HTMLElement) {
    const moreButton = this.#createMoreButton();
    $section.appendChild(moreButton.$target);
  }

  #createMoreButton() {
    const textNode = document.createTextNode('더 보기');
    return new Button({
      id: 'more-button',
      classNames: ['btn', 'primary', 'full-width'],
      children: [textNode],
      onClick: this.handleClickMoreMovies.bind(this),
    });
  }

  updateTitle(movieCount: number, title: string) {
    const $title = dom.getElement(this.$target, '#title');
    $title.textContent = movieCount === 0 ? MESSAGE.SEARCH_NOT_FOUND_TITLE(title) : MESSAGE.SEARCH_FOUND_TITLE(title);
  }

  handleClickMoreMovies() {
    this.movieListContainer.attach();
  }

  #handleInfinityScroll() {
    const $moreButton = dom.getElement<HTMLButtonElement>(this.$target, '#more-button');

    const options = {
      root: null,
      rootMargin: '0px 0px 150px 0px',
      threshold: 0,
    };

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          !$moreButton.classList.contains('hidden') && this.handleClickMoreMovies();
        }
      });
    }, options);

    io.observe($moreButton);
  }

  #handleClickMiniSearchButton() {
    dom.getElement(this.$target, '#logo').classList.add('clicked-logo');
    dom.getElement(this.$target, '.search-box').classList.add('clicked-form');
    dom.getElement(this.$target, '.search-input').classList.add('clicked-input');
    dom.getElement(this.$target, 'header').classList.add('clicked-header');
  }
}
export default App;
