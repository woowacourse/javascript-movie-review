import logo from '../assets/logo.png';

export default class Header {
  $element;

  constructor($parent) {
    this.$element = document.createElement('header');

    $parent.insertAdjacentElement('afterbegin', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
  }

  template() {
    return `    
    <h1><img src=${logo} alt="MovieList 로고"/></h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>`;
  }
}
