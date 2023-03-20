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

  addEvents(): this {
    let enabled = true;

    this.searchInput.addEventListener('keypress', this.#handleKeyEnter(enabled).bind(this));
    this.searchButton.addEventListener('click', this.#handleClickSearch(enabled).bind(this));

    return this;
  }

  #handleKeyEnter(enabled: boolean) {
    return (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      console.log(enabled);

      if (enabled) {
        enabled = false;
        this.dispatchSearchEvent(this.searchInput.value);
        this.searchInput.value = '';
        setTimeout(() => {
          enabled = true;
        }, 2000);
      }
    };
  }

  #handleClickSearch(enabled: boolean) {
    return () => {
      console.log('clicked');
      if (enabled) {
        enabled = false;
        this.dispatchSearchEvent(this.searchInput.value);
        this.searchInput.value = '';
        setTimeout(() => {
          enabled = true;
        }, 2000);
      }
    };
  }

  dispatchSearchEvent(keyword: string): void {
    this.node.dispatchEvent(new CustomEvent('submit-search', { bubbles: true, detail: { keyword } }));
  }
}

export default SearchBox;
