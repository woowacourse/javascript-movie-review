import logo from '../assets/logo.png';
import { Component } from '../type/Component';

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
    this.setEvent();
  }

  template() {
    return `    
    <h1><img class="main-logo" src=${logo} alt="MovieList 로고"/></h1>
    <form class="search-box">
      <input name='query'type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>`;
  }

  setEvent() {
    this.$element.querySelector('.search-box')?.addEventListener('submit', this.onSubmitSerachForm.bind(this));
    this.$element.querySelector('.main-logo')?.addEventListener('click', this.onClickMainLogo.bind(this));
  }

  onSubmitSerachForm(e: Event) {
    e.preventDefault();

    const $form = <HTMLFormElement>e.target;
    const $query = <HTMLInputElement>$form.querySelector('input[name="query"]');

    this.#renderer.searchedMovieList($query.value);
  }

  onClickMainLogo() {
    this.#renderer.popularMovieList();
    (<HTMLFormElement>this.$element.querySelector('.search-box')).reset();
  }
}
