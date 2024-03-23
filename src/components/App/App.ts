import './App.css';

import LOGO from '../../assets/images/logo.png';
import { dom } from '../../utils/dom';
import Header from '../header/Header';
import MovieListContainer from '../movieListContainer/MovieListContainer';
import Button from '../common/button/Button';
import Toast from '../../Toast';
import CONFIG from '../../constants/config';
import { MESSAGE } from '../../constants/message';

class App {
  $target: HTMLElement;
  movieListContainer: MovieListContainer;
  toast: Toast = new Toast('');

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
        <button style="display: none;" id="toast_btn"></button>
      </section>
    </main>
    `;
  }

  render() {
    const header = this.#createHeader();
    const button = this.#createMoreButton();

    const $section = dom.getElement<HTMLButtonElement>(this.$target, '.item-view');
    $section.appendChild(button.$target);
    $section.appendChild(this.toast.$target);

    const $title = dom.getElement(this.$target, 'h2');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const title = urlSearchParams.get('title') ?? '';
    $title.textContent = title ? MESSAGE.SEARCH_RESULT_FOUND_TITLE(title) : MESSAGE.HOME_TITLE;

    const slotMovieList = dom.getElement(this.$target, '.slot-movie-list');
    slotMovieList.replaceWith(this.movieListContainer.$target);
    this.$target.prepend(header.$target);
  }

  setEvent() {
    const $button = dom.getElement<HTMLButtonElement>(this.$target, '#toast_btn');

    $button.addEventListener<any>('onToast', (e: CustomEvent) => {
      const message = e.detail;
      this.toast.on(message);
    });
  }

  #createHeader() {
    return new Header({
      imageSrc: LOGO,
      onSubmit: async (e: SubmitEvent) => {
        e.preventDefault();

        const $input = dom.getElement<HTMLInputElement>(this.$target, '#search-input');
        if (!$input.value) return;

        history.pushState('', '', `?mode=search&title=${$input.value}`);

        this.movieListContainer.initPageNumber();
        const { movies, totalPages } = await this.movieListContainer.fetchMovies(CONFIG.FIRST_PAGE);

        this.renderTitle(movies.length, $input.value);
        this.movieListContainer.paint(movies);

        const $moreButton = dom.getElement(this.$target, '#more-button');
        if (this.movieListContainer.page === totalPages) $moreButton.classList.add('hidden');
        else if (this.movieListContainer.page !== totalPages) $moreButton.classList.remove('hidden');
      },
    });
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

  renderTitle(movieLength: number, title: string) {
    const $title = dom.getElement(this.$target, 'h2');
    $title.textContent = MESSAGE.SEARCH_RESULT_FOUND_TITLE(title);
    if (movieLength === 0) $title.textContent = MESSAGE.SEARCH_RESULT_NOT_FOUND_TITLE(title);
  }

  handleClickMoreMovies() {
    this.movieListContainer.attach();
  }
}
export default App;
