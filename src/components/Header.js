import './Header.css';
import Logo from '../image/logo.png';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
      <search-input></search-input>
    </header>`;
  }
}

export default Header;
