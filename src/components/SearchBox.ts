import { MOBILE_WIDTH } from '../libs/constant';

class SearchBox {
  private _node!: HTMLElement;
  private $input!: HTMLInputElement;
  private $searchBoxLayout!: HTMLDivElement;

  constructor() {
    this.createTemplate();
    this.$input = this._node.querySelector('.search-input') as HTMLInputElement;
    this.$searchBoxLayout = this._node.querySelector('.search-box-layout') as HTMLDivElement;
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
      <div class="search-box-layout">
        <input class="search-input" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
      `
    );
  }

  toggleInputUI() {
    const width = window.innerWidth;

    if (width < MOBILE_WIDTH) this.$input.classList.add('hidden');
    else {
      this.$input.classList.remove('hidden');
      this.$searchBoxLayout.classList.remove('width-zero');
    }
  }

  mouseEnterSearchIcon() {
    const width = window.innerWidth;

    if (width > MOBILE_WIDTH) return;

    this.$input.focus();

    this.$input.classList.remove('hidden');
    this.$searchBoxLayout.classList.add('width-full');
    this.$input.classList.add('width-full');
    this.$searchBoxLayout.classList.remove('width-zero');
    this.$input.classList.remove('width-zero');
    this._node.dispatchEvent(new CustomEvent('enterSearchIcon', { bubbles: true }));
  }

  mouseLeaveSearchIcon() {
    const width = window.innerWidth;

    if (width > MOBILE_WIDTH) return;

    this.$searchBoxLayout.classList.remove('width-full');
    this.$input.classList.remove('width-full');
    this.$searchBoxLayout.classList.add('width-zero');
    this.$input.classList.add('width-zero');
    this._node.dispatchEvent(new CustomEvent('leaveSearchIcon', { bubbles: true }));
  }

  dispatchSearchEvent(keyword: string): void {
    this._node.dispatchEvent(new CustomEvent('searchMovies', { bubbles: true, detail: { keyword } }));
  }

  clickSearchButton() {
    const width = window.innerWidth;

    if (width > MOBILE_WIDTH) this.dispatchSearchEvent(this.$input.value);
    else this.mouseEnterSearchIcon();
  }

  initEventHandler() {
    const button = this._node.querySelector<HTMLButtonElement>('.search-button');

    if (!button) return;

    this.$input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      this.dispatchSearchEvent(this.$input.value);
    });
    button.addEventListener('click', this.clickSearchButton.bind(this));
    this.$searchBoxLayout.addEventListener('mouseenter', this.mouseEnterSearchIcon.bind(this));
    this.$searchBoxLayout.addEventListener('mouseleave', this.mouseLeaveSearchIcon.bind(this));
    window.addEventListener('resize', this.toggleInputUI.bind(this));
    window.addEventListener('load', this.toggleInputUI.bind(this));
  }
}

export default SearchBox;
