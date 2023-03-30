import SearchBox from './SearchBox';
import logoImage from '../asset/logo.png';

class Header {
  private _node!: HTMLElement;
  private $logoContainer!: HTMLDivElement;

  constructor() {
    this.createTemplate();
    this.$logoContainer = this._node.querySelector('h1') as HTMLDivElement;

    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('header');
    this._node.classList.add('header', 'header-between');
    this._node.insertAdjacentHTML(
      'afterbegin',
      /*html*/ `<h1 class="header-layout"><img src="${logoImage}" alt="MovieList 로고" /></h1>`
    );

    const searchBox = new SearchBox();
    this._node.querySelector('.header-layout')?.insertAdjacentElement('beforeend', searchBox.node);
  }

  clickLogoIcon(event: Event) {
    const target = event.target as HTMLDivElement;

    if (!target.matches('.search-box')) return;

    this._node.dispatchEvent(new CustomEvent('moveHome', { bubbles: true }));
    const $searchInput = this._node.querySelector('input') as HTMLInputElement;
    $searchInput.value = '';
  }

  initEventHandler() {
    this.$logoContainer.addEventListener('click', this.clickLogoIcon.bind(this));
  }
}

export default Header;
