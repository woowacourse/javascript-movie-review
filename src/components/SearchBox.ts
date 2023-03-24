class SearchBox {
  private _node!: HTMLElement;
  private $input!: HTMLInputElement;

  constructor() {
    this.createTemplate();
    this.$input = this._node.querySelector<HTMLInputElement>('input') as HTMLInputElement;
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

  toggleInputUI() {
    const width = window.innerWidth;

    if (width < 600) this.$input.classList.add('hidden');
    else {
      this.$input.classList.remove('hidden');
      this.$input.classList.remove('width-zero');
      this._node.classList.remove('width-zero');
    }
  }

  mouseEnterSearchIcon() {
    const width = window.innerWidth;

    if (width > 600) return;

    this.$input.focus();

    this.$input.classList.remove('hidden');
    this.$input.classList.add('width-full');
    this.$input.classList.remove('width-zero');
    this._node.classList.add('width-full');
    this._node.classList.remove('width-zero');
    this._node.dispatchEvent(new CustomEvent('enterSearchIcon', { bubbles: true }));
  }

  mouseLeaveSearchIcon() {
    const width = window.innerWidth;

    if (width > 600) return;

    this.$input.classList.add('hidden');
    this.$input.classList.add('width-zero');
    this.$input.classList.remove('width-full');
    this._node.classList.add('width-zero');
    this._node.classList.remove('width-full');
    this._node.dispatchEvent(new CustomEvent('leaveSearchIcon', { bubbles: true }));
  }

  dispatchSearchEvent(keyword: string): void {
    this._node.dispatchEvent(new CustomEvent('searchMovies', { bubbles: true, detail: { keyword } }));
  }

  initEventHandler() {
    const button = this._node.querySelector<HTMLButtonElement>('.search-button');

    if (!button) return;

    this.$input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      this.dispatchSearchEvent(this.$input.value);
    });
    button.addEventListener('click', () => {
      this.dispatchSearchEvent(this.$input.value);
    });
    this._node.addEventListener('mouseenter', this.mouseEnterSearchIcon.bind(this));
    this._node.addEventListener('mouseleave', this.mouseLeaveSearchIcon.bind(this));
    window.addEventListener('resize', this.toggleInputUI.bind(this));
    window.addEventListener('load', this.toggleInputUI.bind(this));
  }
}

export default SearchBox;
