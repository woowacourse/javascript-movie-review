class SearchBox {
  private _node!: HTMLElement;

  constructor() {
    this.createTemplete().initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplete(): this {
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
      console.log('clicked!');
    });
  }
}

export default SearchBox;
