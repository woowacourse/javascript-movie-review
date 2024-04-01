import './App.css';

import { dom } from '../../utils/dom';

import Header from '../header/Header';
import MovieListContainer from '../movieListContainer/MovieListContainer';
import Button from '../common/button/Button';
import Modal from '../common/modal/Modal';
import MovieItemDetail from '../movieItemDetail/MovieItemDetail';
import CloseButton from '../common/button/CloseButton';
import Toast from '../../Toast';

const TEMPLATE = `
  <main>
    <section class="item-view">
      <h2 id="title">지금 인기 있는 영화</h2>
      <slot class="slot-movie-list"></slot>
      <button style="display: none;" id="toast_btn"></button>
    </section>
  </main>
`;

class App {
  readonly $target: HTMLElement = document.createElement('div');
  readonly movieListContainer: MovieListContainer;
  readonly toast: Toast = new Toast('');
  readonly modalContent: MovieItemDetail = this.#createModalContent();
  readonly modal: typeof Modal = Modal;

  constructor() {
    this.$target.id = 'app';
    this.$target.innerHTML = TEMPLATE;
    this.movieListContainer = new MovieListContainer();

    this.$target.append(this.modal.$target);
    this.modal.append(this.modalContent.$target);
    this.#render();
    this.#setEvent();
  }

  #render() {
    const header = this.#createHeader();
    const button = this.#createMoreButton();

    const $section = dom.getElement<HTMLButtonElement>(this.$target, '.item-view');
    $section.appendChild(button.$target);
    $section.appendChild(this.toast.$target);

    const $title = dom.getElement(this.$target, 'h2');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const title = urlSearchParams.get('title') ?? '';

    $title.textContent = title ? `"${title}" 검색 결과` : '지금 인기 있는 영화';
    const slotMovieList = dom.getElement(this.$target, '.slot-movie-list');

    slotMovieList.replaceWith(this.movieListContainer.$target);

    this.$target.prepend(header.$target);
  }

  #setEvent() {
    const $button = dom.getElement<HTMLButtonElement>(this.$target, '#toast_btn');

    $button.addEventListener<any>('onToast', (e: CustomEvent) => {
      const message = e.detail;
      this.toast.on(message);
    });

    const SCROLL_TROTTLE_TIME = 500;
    const throttleScrollHandler = this.#getThrottleFunction(
      this.#infiniteScrollHandler.bind(this),
      SCROLL_TROTTLE_TIME,
    ).bind(this);

    window.addEventListener('scroll', throttleScrollHandler);
  }

  #createHeader() {
    return new Header({
      imageSrc: './images/logo.png',
      onSubmit: this.#onSearchSubmit.bind(this),
    });
  }

  async #onSearchSubmit(e: SubmitEvent) {
    e.preventDefault();

    const $input: HTMLInputElement = dom.getElement(this.$target, '#search-input');
    if (!$input.value) return;
    history.pushState('', '', `?mode=search&title=${$input.value}`);

    await this.movieListContainer.render();
    const moviesCount = this.movieListContainer.moviesCount;
    this.#renderTitle(moviesCount, $input.value);
  }

  #createMoreButton() {
    const textNode = document.createTextNode('더 보기');
    return new Button({
      id: 'more-button',
      classNames: ['btn', 'primary', 'full-width'],
      children: [textNode],
      onClick: this.#handleClickMoreMovies.bind(this),
    });
  }

  #renderTitle(movieLength: number, text: string) {
    const $title = dom.getElement(this.$target, 'h2');

    if (movieLength > 0) {
      $title.textContent = `"${text}" 검색 결과`;
    } else {
      $title.textContent = `"${text}" 검색 결과가 없습니다`;
    }
  }

  #handleClickMoreMovies() {
    this.movieListContainer.attach();
  }

  #createModalContent() {
    const $modalContent = new MovieItemDetail({
      id: 123,
      title: '해리 포터 20주년: 리턴 투 호그와트',
      imageSrc: './images/image.png',
      score: 6.42,
      genre: ['Action', 'Adventure'],
      description:
        '해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.',
    });

    $modalContent.$target.append(this.#createModalCloseButton());
    return $modalContent;
  }

  #createModalCloseButton() {
    const $modalCloseButton = new CloseButton();
    $modalCloseButton.$target.classList.add('modal-close-button');
    $modalCloseButton.$target.addEventListener('click', () => {
      this.modal.close();
    });
    return $modalCloseButton.$target;
  }

  openModal() {
    this.modal.open();
  }

  paintModal(element: HTMLElement) {
    element.appendChild(this.#createModalCloseButton());
    this.modalContent.$target.replaceWith(element);
    this.modalContent.$target = element;

    this.openModal();
  }

  #getThrottleFunction(callback: () => void, throttleTime: number) {
    let throttle: boolean = false;
    return (_: Event) => {
      if (!throttle) {
        throttle = true;
        setTimeout(() => {
          throttle = false;
          callback();
        }, throttleTime);
      }
    };
  }

  #infiniteScrollHandler(e?: Event) {
    const INFINITE_SCROLL_THRESHOLD = 50;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - INFINITE_SCROLL_THRESHOLD) {
      this.movieListContainer.attach();
    }
  }
}

const appInstance = new App();
export default appInstance;
