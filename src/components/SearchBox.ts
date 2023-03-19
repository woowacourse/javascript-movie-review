class SearchBox implements Component {
  readonly node: HTMLElement;
  private searchInput!: HTMLInputElement;
  private searchButton!: HTMLButtonElement;
  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('search-box');

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
      `;

    return this;
  }

  setElements(): this {
    const input = this.node.querySelector<HTMLInputElement>('input');
    const button = this.node.querySelector<HTMLButtonElement>('.search-button');

    if (!(input && button)) {
      return this;
    }

    this.searchInput = input;
    this.searchButton = button;

    return this;
  }

  // TODO: throttling 구현

  addEvents(): this {
    this.searchInput.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      this.dispatchSearchEvent(this.searchInput.value);
    });

    this.searchButton.addEventListener('click', () => {
      this.dispatchSearchEvent(this.searchInput.value);
    });

    return this;
  }

  dispatchSearchEvent(keyword: string): void {
    this.node.dispatchEvent(new CustomEvent('searchMovies', { bubbles: true, detail: { keyword } }));
  }
}

export default SearchBox;
