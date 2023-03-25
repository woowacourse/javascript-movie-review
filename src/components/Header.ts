import './Header.css';
import { $ } from '../utils/common';
import { HTMLMovieContainerElement } from './MoviesContainer';
import LOGO from '../image/logo.png';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLogoClickEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
    <header id="movie-header-bar" class="movie-header">
      <h1 id="logo" class="movie-logo"><img src="${LOGO}" alt="MovieList 로고" /></h1>
      <search-input></search-input>
    </header>`;
  }

  setLogoClickEvent() {
    $('#logo')?.addEventListener('click', () => {
      const movieContainer = $('movies-container') as HTMLMovieContainerElement;

      movieContainer.setSearchWord('');
    });
  }
}

export default Header;
