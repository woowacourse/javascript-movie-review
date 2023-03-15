import template from './index.html';
export class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }

  addSearchHandler(searchHandler: CallableFunction) {
    const $input = this.querySelector('input');
    $input?.addEventListener('change', (e: Event) => {
      if (!(e.currentTarget instanceof HTMLInputElement)) return;
      const { value } = e.currentTarget;
      searchHandler(value);
    });
  }
}
