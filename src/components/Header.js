import logo from '../assets/logo.png';

export default class Header {
  #renderMovieListByOption;
  $element;

  constructor($parent, renderMovieListByOption) {
    this.#renderMovieListByOption = renderMovieListByOption;
    this.$element = document.createElement('header');

    $parent.insertAdjacentElement('afterbegin', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
  }

  template() {
    return `    
    <h1><img src=${logo} alt="MovieList 로고"/></h1>
    <form class="search-box">
      <input name='query'type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>`;
  }

  setEvent() {
    this.$element.querySelector('.search-box').addEventListener('submit', this.onSubmitSerachForm.bind(this));
  }

  onSubmitSerachForm(e) {
    e.preventDefault();

    const queryInput = e.target.elements['query'].value;

    this.#renderMovieListByOption('search', queryInput);
  }
}
