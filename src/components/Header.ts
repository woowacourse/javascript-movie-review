import logo from '../assets/logo.png';
import { Component } from '../type/Component';

const MOBILE_WIDTH = 768;

export default class Header implements Component {
  #renderer;
  $element;

  constructor(
    $parent: Element,
    renderer: { renderPopularMovieList: () => void; renderSearchedMovieList: (query: string) => void }
  ) {
    this.#renderer = {
      popularMovieList: renderer.renderPopularMovieList,
      searchedMovieList: renderer.renderSearchedMovieList,
    };
    this.$element = document.createElement('header');

    $parent.insertAdjacentElement('afterbegin', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    if (window.outerWidth <= MOBILE_WIDTH) this.setEventForMobile();
    this.setEvent();
  }

  template() {
    return `    
    <h1><img class="main-logo" src=${logo} alt="MovieList 로고"/></h1>
    <form class="search-box">
      <input name='query'type="text" placeholder="검색" required/>
      <button class="search-button">검색</button>
    </form>`;
  }

  setEvent() {
    (<HTMLFormElement>this.$element.querySelector('.search-box')).addEventListener(
      'submit',
      this.onSubmitSerachForm.bind(this)
    );
    (<HTMLImageElement>this.$element.querySelector('.main-logo')).addEventListener(
      'click',
      this.onClickMainLogo.bind(this)
    );
  }

  setEventForMobile() {
    this.hideSearchInput();
    
    (<HTMLButtonElement>this.$element.querySelector('.search-button')).addEventListener(
      'click',
      this.onClickSearchButton.bind(this),
      { once: true }
    );
  }

  onSubmitSerachForm(e: Event) {
    e.preventDefault();

    const $form = <HTMLFormElement>e.target;
    const $input = <HTMLInputElement>$form.querySelector('input[name="query"]');

    this.#renderer.searchedMovieList($input.value);
  }

  onClickSearchButton(e: Event) {
    e.preventDefault();

    this.showSearchInput();
  }

  onClickMainLogo() {
    this.render();
    this.#renderer.popularMovieList();
  }

  hideSearchInput() {
    const $input = <HTMLInputElement>this.$element.querySelector('input[name="query"]');
    $input.classList.add('hide');
  }

  showSearchInput() {
    const $input = <HTMLInputElement>this.$element.querySelector('input[name="query"]');
    $input.classList.remove('hide');
  }
}
