import Component from '../types/component';
import SearchBox from './SearchBox';

class Header implements Component {
  readonly node: HTMLElement;
  private logo!: HTMLHeadingElement;

  private children: { [key: string]: Component };

  constructor() {
    this.node = document.createElement('header');
    this.node.classList.add('header');
    this.children = { searchBox: new SearchBox() };

    this.composeNode().setElements().setEvents();
  }

  composeNode() {
    this.node.innerHTML = '<h1><img src="./logo.png" alt="MovieList 로고" /></h1>';
    this.node.appendChild(this.children.searchBox.node);

    return this;
  }

  setElements(): this {
    const logo = this.node.querySelector<HTMLHeadingElement>('h1');

    if (!logo) {
      return this;
    }

    this.logo = logo;
    return this;
  }

  setEvents(): this {
    this.logo.addEventListener('click', this.#handleClickLogo.bind(this));

    return this;
  }

  #handleClickLogo() {
    this.node.dispatchEvent(new Event('click-logo', { bubbles: true }));
  }
}

export default Header;
