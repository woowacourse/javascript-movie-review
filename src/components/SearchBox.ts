import Component from '../types/component';

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
      <input class="search-input" type="text" placeholder="검색" />
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

  addEvents(): this {
    let enabled = { value: true };

    this.searchInput.addEventListener('keypress', this.#handleKeyEnter(enabled).bind(this));
    this.searchButton.addEventListener('click', this.#handleClickSearch(enabled).bind(this));

    return this;
  }

  #handleKeyEnter(enabled: { value: boolean }) {
    return (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      if (enabled.value) {
        enabled.value = false;
        this.dispatchSearchEvent(this.searchInput.value);
        this.searchInput.value = '';
        setTimeout(() => {
          enabled.value = true;
        }, 2000);
      }
    };
  }

  #handleClickSearch(enabled: { value: boolean }) {
    return () => {
      if (enabled.value) {
        enabled.value = false;
        this.dispatchSearchEvent(this.searchInput.value);
        this.searchInput.value = '';
        setTimeout(() => {
          enabled.value = true;
        }, 2000);
      }
    };
  }

  dispatchSearchEvent(keyword: string): void {
    this.node.dispatchEvent(new CustomEvent('submit-search', { bubbles: true, detail: { keyword } }));
  }
}

export default SearchBox;
