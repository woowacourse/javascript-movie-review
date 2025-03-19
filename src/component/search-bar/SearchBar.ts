class SearchBar {
  #container: HTMLElement;
  #searchInput = '';

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('searchbar');
    this.render();

    // this.#container.querySelector('input')?.addEventListener('onchange', () => {
    //   this.#searchInput
    // });
  }

  render() {
    this.#container.innerHTML = `
      <input placeholder="검색어를 입력하세요" class="text-placeholder searchbar__input"/>
      <img src="./search-icon.png" class="searchbar__icon"/>
  `;
  }

  get element() {
    return this.#container;
  }
}

export default SearchBar;
