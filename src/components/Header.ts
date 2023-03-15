export default class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1><img src="../assets/logo.png" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    </header>
    `;
  }
}
