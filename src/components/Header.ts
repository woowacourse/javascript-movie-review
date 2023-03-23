import './Header.css';
import { $ } from '../utils/common';
import { MovieConatainerInformation } from './MoviesContainer';
import LOGO from '../image/logo.png';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLogoClickEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
    <header class="movie-header">
      <h1 id="logo" class="movie-logo"><img src="${LOGO}" alt="MovieList 로고" /></h1>
      <search-input></search-input>
    </header>`;
  }

  setLogoClickEvent() {
    $('#logo')?.addEventListener('click', () => {
      const movieContainer = $('movies-container') as MovieConatainerInformation;

      movieContainer.setSearchWord('');
    });
  }
}

export default Header;
