import './style.css';

import SearchField from '../SearchField/SearchField';
import Logo from '../../imgs/logo.png';

class Header {
  private template: HTMLElement;

  constructor() {
    this.template = this.createHeader();
    this.createElements();
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
    const searchField = this.createSerchField();
    this.template.appendChild(searchField);
  }

  createSerchField() {
    const searchField = new SearchField();
    return searchField.getElement();
  }

  getElement() {
    return this.template;
  }

  onLogoClick() {}
}

export default Header;
