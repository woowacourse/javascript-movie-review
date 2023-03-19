import template from './index.html';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.#render();
  }

  #render() {
    this.innerHTML = template
      .replace('{poster_path}', this.getAttribute('poster')!)
      .replaceAll('{title}', this.getAttribute('title')!)
      .replace('{vote_average}', this.getAttribute('vote')!);
  }
}
