import { $ } from '../utils/domSelector';

class Header {
  $parentElement;

  constructor(parentElement: HTMLElement) {
    this.$parentElement = parentElement;
    this.render();
  }

  private render() {
    const template = `      
      <h1><a href="./"><img src="./assets/logo.png" alt="MovieList 로고" /></a></h1>
      <div class="search-box">
        <input type="text" id="search-input" placeholder="Search" />
        <button class="search-button" id="search-button">검색</button>
      </div>`;

    this.$parentElement.innerHTML = template;
  }

  addClickEventHandler(onClickSearchButton: CallableFunction) {
    const $searchButton = $('#search-button');
    const $searchInput = $('#search-input');

    $searchButton.addEventListener('click', () => {
      if (!($searchInput instanceof HTMLInputElement)) return;

      onClickSearchButton($searchInput.value);
    });

    $searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (!($searchInput instanceof HTMLInputElement)) return;

        onClickSearchButton($searchInput.value);
      }
    });
  }
}

export default Header;
