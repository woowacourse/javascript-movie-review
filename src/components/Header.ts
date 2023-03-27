import './Header.css';
import { $ } from '../utils/common';
import LOGO from '../image/logo.png';

class Header extends HTMLElement {
  connectedCallback(): void {
    this.render();
    this.setLogoClickEvent();
  }

  render(): void {
    this.innerHTML = /*html*/ `
    <header id="movie-header-bar" class="movie-header">
      <h1 id="logo" class="movie-logo"><img src="${LOGO}" alt="MovieList 로고" /></h1>
      <search-input></search-input>
    </header>`;
  }

  setLogoClickEvent(): void {
    $('#logo')?.addEventListener('click', () => {
      if (window.location.hash === '') {
        window.scrollTo(0, 0);
      }

      window.location.hash = '';
    });
  }
}

export default Header;
