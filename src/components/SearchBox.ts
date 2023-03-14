class SearchBox {
  private targetElement!: HTMLElement;

  constructor() {
    this.createTemplete().initEventHandler();
  }

  get template(): string {
    return this.targetElement.innerHTML;
  }

  createTemplete(): this {
    const wrapper = document.createElement('div');

    wrapper.insertAdjacentHTML(
      'afterbegin',
      `<wrapper>
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      <div>
      `
    );

    this.targetElement = wrapper;

    return this;
  }

  initEventHandler() {}
}

export default SearchBox;
