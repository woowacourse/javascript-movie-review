import SearchBox from './SearchBox';
import logoImage from '../asset/logo.png';

class Header {
  private _node!: HTMLElement;

  constructor() {
    this.createTemplate();
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('header');
    this._node.classList.add('header');
    this._node.insertAdjacentHTML('afterbegin', `<h1><img src="${logoImage}" alt="MovieList 로고" /></h1>`);

    const searchBox = new SearchBox();
    this._node.insertAdjacentElement('beforeend', searchBox.node);

    return this;
  }

  clickLogoIcon() {
    this._node.dispatchEvent(new Event('moveHome', { bubbles: true }));
  }

  initEventHandler() {
    const logoIcon = this._node.querySelector('h1');

    if (!logoIcon) return;

    logoIcon.addEventListener('click', this.clickLogoIcon.bind(this));
  }
}

export default Header;
