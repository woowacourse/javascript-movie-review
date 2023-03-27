import logo from '../../assets/logo.png';
import Component from '../../type/Component';

import './header.css';

type HandlerCallback = {
  onClickMainLogo: () => void;
  onSubmitSearchForm: (query: string) => void;
};

export default class Header implements Component {
  private $element;

  constructor($parent: Element, private handlerCallback: HandlerCallback) {
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
      <input name="query" type="text" placeholder="검색" required/>
      <button class="search-button">검색</button>
    </form>`;
  }

  setEvent() {
    this.$element.querySelector('.search-box')?.addEventListener('submit', this.onSubmitSearchForm.bind(this));
    this.$element.querySelector('.main-logo')?.addEventListener('click', this.onClickMainLogo.bind(this));
  }

  onSubmitSearchForm(e: Event) {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const queryInput = e.target.elements.namedItem('query');
    if (!(queryInput instanceof HTMLInputElement)) return;

    this.handlerCallback.onSubmitSearchForm(queryInput.value);
    e.target.reset();
  }

  onClickMainLogo() {
    this.handlerCallback.onClickMainLogo();
    const searchForm = this.$element.querySelector('.search-box');

    if (!(searchForm instanceof HTMLFormElement)) return;

    searchForm.reset();
  }
}
