import { $ } from '../util/querySelector';

class Header {
  #element;
  #manager;

  constructor (manager, element) {
    this.#element = element;
    this.#manager = manager;
  }

  render () {
    this.#element.innerHTML = `
      <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" id="search-input" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    `;
    this.#searchEvent();
  }

  #searchEvent () {
    this.#element.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON') {
        const searchData = $('#search-input').value;
        await this.#manager.searchMovieList(searchData);
        this.#element.dispatchEvent(new CustomEvent('searchFullfilled', { bubbles: true }));
      }
    });
  }
}

export default Header;
