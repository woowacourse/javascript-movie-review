import Logo from '../../image/logo.png';

import { dispatchCustomEvent } from '../utils/domUtils';

class MovieHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <header>
        <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  connectedCallback() {
    this.querySelector('form').addEventListener('submit', this.handleSubmit);
    this.querySelector('h1').addEventListener('click', () => dispatchCustomEvent(this, 'home'));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const [input] = e.target;
    dispatchCustomEvent(this, 'search', input.value);
  };
}

export default MovieHeader;
