import './style.css';

import SearchField from '../SearchField/SearchField';
import Logo from '../../imgs/logo.png';

class Header {
  private template: HTMLElement;

  constructor() {
    this.template = this.createHeader();
    this.createElements();
    this.setEventlistener();
  }

  createHeader() {
    const header = document.createElement('header');
    return header;
  }

  createElements() {
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    img.src = Logo;
    img.setAttribute('alt', 'MovieList 로고');
    h1.appendChild(img);
    this.template.appendChild(h1);
    const searchField = this.createSearchField();
    this.template.appendChild(searchField);
  }

  createSearchField() {
    const searchField = new SearchField();
    return searchField.getElement();
  }

  getElement() {
    return this.template;
  }

  setEventlistener() {
    const logo = this.template.querySelector('img');
    logo?.addEventListener('click', this.dispatchGetPopularMovie);
  }

  dispatchGetPopularMovie() {
    const getPopularMoviesEvent = new CustomEvent('GetPopularMovies', {
      bubbles: true,
    });
    document.dispatchEvent(getPopularMoviesEvent);
  }
}

export default Header;
