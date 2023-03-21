import template from './index.html';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.#render();
    this.imageSkeletonHandler();
  }

  #render() {
    this.innerHTML = template
      .replace('{poster_path}', this.getAttribute('poster') ?? '알 수 없음')
      .replaceAll('{title}', this.getAttribute('title') ?? '알 수 없음')
      .replace('{vote_average}', this.getAttribute('vote') ?? '알 수 없음');
  }

  imageSkeletonHandler() {
    const a = this.querySelector('img');
    const b = this.querySelector('.skeleton');

    a?.addEventListener('load', () => {
      a.classList.remove('hidden');
      b?.remove();
    });
  }
}
