import { $context } from '../utils/selector';

export class SearchBox {
  private readonly $root = document.createElement('form');

  private readonly $ = $context(this.$root);

  constructor() {
    this.$root.classList.add('search-box');
    this.$root.innerHTML = `
      <input type="text" name="search-text" placeholder="검색" />
      <button class="search-button">검색</button>
    `.trim();

    this.$('button').addEventListener('click', (event) => {
      const $input = this.$<HTMLInputElement>('input');
      if ($input.value.length === 0) {
        $input.focus();
        event.preventDefault();
      }
    });
  }

  getRoot() {
    return this.$root;
  }
}
