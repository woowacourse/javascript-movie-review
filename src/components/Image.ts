import './Image.css';
import DEFAULT_IMAGE from '../image/default-movie-image.png';

class Image extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLoadingEvent();
  }

  async render() {
    const EMPTY = 'null';

    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const width = this.getAttribute('width');

    const URL = imgUrl !== EMPTY ? `https://image.tmdb.org/t/p/w${width}${imgUrl}` : DEFAULT_IMAGE;

    this.innerHTML = /*html*/ `
      <img
        class="movie-image skeleton-image"
        src="${URL}"
        loading="lazy"
        alt="${title}"
      />`;
  }

  setLoadingEvent() {
    this.querySelector('img')?.addEventListener('load', () => {
      this.querySelector('img')?.classList.remove('skeleton-image');
    });
  }
}

export default Image;
