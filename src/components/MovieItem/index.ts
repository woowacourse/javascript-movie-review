import template from './index.html';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.#render();
    this.imageSkeletonHandler();
  }

  #render() {
    this.innerHTML = template
      .replace('{id}', this.getAttribute('id') ?? '알 수 없음')
      .replace('{poster_path}', this.getAttribute('poster') ?? '알 수 없음')
      .replaceAll('{title}', this.getAttribute('title') ?? '알 수 없음')
      .replace('{vote_average}', this.getAttribute('vote') ?? '알 수 없음');
  }

  imageSkeletonHandler() {
    const movieImg = this.querySelector('img');
    const skeleton = this.querySelector('.skeleton');

    movieImg?.addEventListener('load', () => {
      movieImg.classList.remove('hidden');
      skeleton?.remove();
    });
  }
}
