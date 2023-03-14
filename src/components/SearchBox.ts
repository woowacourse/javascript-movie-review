class SearchBox {
  private _node!: HTMLElement;

  constructor() {
    this.createTemplate().initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('div');
    this._node.classList.add('search-box');

    this._node.insertAdjacentHTML(
      'afterbegin',
      `
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
      `
    );

    return this;
  }

  initEventHandler() {
    this._node.querySelector<HTMLInputElement>('input')?.addEventListener('click', () => {
      this._node.dispatchEvent(new CustomEvent('changeMoviesType', {bubbles: true, detail: {serach: '해리포터'}}));
    });
  }
}

export default SearchBox;
