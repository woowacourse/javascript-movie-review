import template from './index.html';
import { fetchSearchMovie } from '../../fetch';

export class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    const $input = this.querySelector('input');
    $input?.addEventListener('change', (e: Event) => {
      if (!(e.currentTarget instanceof HTMLInputElement)) return;
      const { value } = e.currentTarget;
      this.searchMovie(value);
    });
  }

  async searchMovie(value: string) {
    const movies = await fetchSearchMovie(value);
  }
}
