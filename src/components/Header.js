import { $ } from '../util/querySelector';

class Header {
  #element;
  #manager;

  constructor(element, manager) {
    this.#element = element;
    this.#manager = manager;
    this.#searchEvent();
  }

  render() {
    this.#element.innerHTML = `
      <h1><img src="./assets/logo.png" alt="MovieList 로고" /></h1>
      <form class="search-box">
        <input type="text" id="search-input" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
    `;
  }

  #searchEvent() {
    this.#element.addEventListener('click', async (event) => {
      if (event.target.tagName === 'IMG') {
        this.#element.dispatchEvent(
          new CustomEvent('searchPending', { bubbles: true })
        );
        await this.#manager.searchMovieList('');
        this.#element.dispatchEvent(
          new CustomEvent('searchFullfilled', { bubbles: true })
        );
      }
    });

    this.#element.addEventListener('submit', async (event) => {
      event.preventDefault();

      const searchData = $('#search-input').value;
      this.#element.dispatchEvent(
        new CustomEvent('searchPending', { bubbles: true })
      );
      await this.#manager.searchMovieList(searchData);
      this.#element.dispatchEvent(
        new CustomEvent('searchFullfilled', { bubbles: true })
      );
    });
  }
}

export default Header;
