import logo from '../assets/logo';

export default class Header {
  constructor($parent) {
    this.$parent = $parent;
  }

  template() {
    return `
      <header>
        <h1><img src="${logo}" alt="MovieList 로고" /></h1>
        <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>
      </header>
    `;
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
