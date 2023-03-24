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
    this._node.insertAdjacentHTML('afterbegin', `<h1><img src="${logoImage}" alt="MovieList 로고" /></h1>`);

    const searchBox = new SearchBox();
    this._node.insertAdjacentElement('beforeend', searchBox.node);
  }

  clickLogoIcon() {
    this._node.dispatchEvent(new CustomEvent('moveHome', { bubbles: true }));
    const $searchInput = this._node.querySelector('input') as HTMLInputElement;
    $searchInput.value = '';
  }

  mouseEnterSearchIcon() {
    const logoIcons = this._node.querySelectorAll('img');

    logoIcons.forEach(logoIcon => logoIcon.remove());
    this._node.classList.remove('header-between');
    this._node.classList.add('header-end');
  }

  mouseLeaveSearchIcon() {
    setTimeout(() => {
      this.$logoContainer.insertAdjacentHTML('afterbegin', `<img src="${logoImage}" alt="MovieList 로고" />`);
      this._node.classList.add('header-between');
      this._node.classList.remove('header-end');

      const logoIcons = this._node.querySelectorAll('img');
      if (logoIcons.length > 1)
        logoIcons.forEach((logoIcon, idx) => {
          if (idx > 0) logoIcon.remove();
        });
    }, 500);
  }

  initEventHandler() {
    this.$logoContainer.addEventListener('click', this.clickLogoIcon.bind(this));
    this._node.addEventListener('enterSearchIcon', this.mouseEnterSearchIcon.bind(this));
    this._node.addEventListener('leaveSearchIcon', this.mouseLeaveSearchIcon.bind(this));
  }
}

export default Header;
