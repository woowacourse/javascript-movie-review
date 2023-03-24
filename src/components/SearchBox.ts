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
      <input class="" type="text" placeholder="검색" />
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

    window.addEventListener('resize', () => {
      const width = window.innerWidth;

      if (width < 600) input.classList.add('hidden');
      else input.classList.remove('hidden');
    });

    window.addEventListener('load', () => {
      const width = window.innerWidth;

      if (width < 600) input.classList.add('hidden');
      else input.classList.remove('hidden');
    });

    this._node.addEventListener('mouseenter', () => {
      const width = window.innerWidth;

      if (width > 600) return;

      input.classList.remove('hidden');
      this._node.dispatchEvent(new CustomEvent('enterSearchIcon', { bubbles: true }));
    });

    this._node.addEventListener('mouseleave', () => {
      const width = window.innerWidth;

      if (width > 600) return;

      input.classList.add('hidden');
      this._node.dispatchEvent(new CustomEvent('leaveSearchIcon', { bubbles: true }));
    });
  }

  dispatchSearchEvent(keyword: string): void {
    this._node.dispatchEvent(new CustomEvent('searchMovies', { bubbles: true, detail: { keyword } }));
  }
}

export default SearchBox;
