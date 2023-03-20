class SearchBox {
  private _node!: HTMLElement;

  constructor() {
    this.createTemplate();
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('div');
    this._node.classList.add('search-box');

    this._node.insertAdjacentHTML(
      'afterbegin',
      `
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
      `
    );
  }

  initEventHandler() {
    const input = this._node.querySelector<HTMLInputElement>('input');
    const button = this._node.querySelector<HTMLButtonElement>('.search-button');

    if (!input || !button) return;

    input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      this.dispatchSearchEvent(input.value);
    });

    button.addEventListener('click', () => {
      this.dispatchSearchEvent(input.value);
    });
  }

  dispatchSearchEvent(keyword: string): void {
    this._node.dispatchEvent(new CustomEvent('searchMovies', { bubbles: true, detail: { keyword } }));
  }
}

export default SearchBox;
