import Logo from '../../assets/logo.png';
import './Header.css';

class Header {
  constructor() {
    this.render();
    this.setEvent();
  }

  render() {
    const headerBox = document.createElement('header');
    headerBox.innerHTML = /* html */ `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>
    `;

    const parent = document.querySelector('#app');
    if (!parent) return;
    parent.prepend(headerBox);
  }

  setEvent(): void {}
}

export default Header;
