import { $ } from '../utils/domSelector';

class Header {
  #element = $('header');

  render() {
    const template = `      
      <h1><img src="./assets/logo.png" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" id="search-input" placeholder="Search" />
        <button class="search-button" id="search-button">검색</button>
      </div>`;

    this.#element.innerHTML = template;
  }

  addClickEventHandler(onClickSearchButton: CallableFunction) {
    const $searchButton = $('#search-button');
    const $searchInput = $('#search-input');

    $searchButton.addEventListener('click', () => {
      if (!($searchInput instanceof HTMLInputElement)) return;

      onClickSearchButton($searchInput.value);
    });
  }
}

export default Header;
