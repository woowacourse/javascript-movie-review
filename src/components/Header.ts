import SearchBox from './SearchBox';

class Header {
  private targetElement!: HTMLElement;

  constructor() {
    this.createTemplate();
  }

  get template() {
    return this.targetElement.innerHTML;
  }

  createTemplate() {
    const wrapper = document.createElement('div');
    const searchBox = new SearchBox();

    wrapper.insertAdjacentHTML(
      'afterbegin',
      `
      <header>
        <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
        ${searchBox.template}
      </header>
      `
    );

    this.targetElement = wrapper;

    return this;
  }
}

export default Header;
