class SearchBar {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');

    this.render();
  }

  render() {
    this.container.innerHTML = `
    <div class="searchbar">
      <input placeholder="검색어를 입력하세요" class="text-placeholder searchbar__input"/>
      <img src="./search-icon.png" class="searchbar__icon"/>
    </div>
  `;
  }

  get element() {
    return this.container.firstElementChild;
  }
}

export default SearchBar;
