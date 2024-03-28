import './style.css';

import SearchField from '../SearchField/SearchField';

import Logo from '../../imgs/logo.png';

class Header {
  private template: HTMLElement;

  constructor() {
    this.template = this.createTemplate();
    this.setEventlistener();
  }

  createTemplate() {
    const header = document.createElement('header');

    const img = document.createElement('img');
    img.classList.add('logo');
    img.src = Logo;
    img.setAttribute('alt', 'MovieList 로고');

    const h1 = document.createElement('h1');
    h1.appendChild(img);

    const searchField = this.createSearchField();

    header.appendChild(h1);
    header.appendChild(searchField);

    return header;
  }

  createSearchField() {
    const searchField = new SearchField();
    return searchField.getElement();
  }

  getElement() {
    return this.template;
  }

  setEventlistener() {
    const logo = this.template.querySelector('img') as HTMLImageElement;
    logo.addEventListener('click', this.dispatchGetPopularMovie.bind(this));
  }

  dispatchGetPopularMovie() {
    const getPopularMoviesEvent = new CustomEvent('GetPopularMovies', {
      bubbles: true,
    });
    document.dispatchEvent(getPopularMoviesEvent);
  }
}

export default Header;
