import './Image.css';
import { $ } from '../utils/common';

class Image extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLoadingEvent();
  }

  async render() {
    const id = this.getAttribute('imgId');
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const width = this.getAttribute('width');

    const URL = `https://image.tmdb.org/t/p/w${width}${imgUrl}`;

    this.innerHTML = `
      <img
        id="${id}"
        class="movie-image skeleton"
        src="${URL}"
        loading="lazy"
        alt="${title}"
      />`;
  }

  setLoadingEvent() {
    const id = this.getAttribute('imgId');

    $(`#${id}`).addEventListener('load', () => {
      $(`#${id}`).classList.remove('skeleton');
    });
  }
}

export default Image;
