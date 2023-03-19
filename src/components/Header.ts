import { $ } from '../utils/domSelector';

class Header {
  #element = $('header');

  render() {
    const template = `      
      <h1><a href="./"><img src="./assets/logo.png" alt="MovieList 로고" /></a></h1>
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

    ($searchInput as HTMLElement).addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!($searchInput instanceof HTMLInputElement)) return;

        onClickSearchButton($searchInput.value);
      }
    });
  }
}

export default Header;
