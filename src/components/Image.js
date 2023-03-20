import './Image.css';

class Image extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setLoadingEvent();
  }

  async render() {
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const width = this.getAttribute('width');

    const URL = `https://image.tmdb.org/t/p/w${width}${imgUrl}`;

    this.innerHTML = `
      <img
        class="movie-image skeleton"
        src="${URL}"
        loading="lazy"
        alt="${title}"
      />`;
  }

  setLoadingEvent() {
    this.querySelector('img').addEventListener('load', () => {
      this.querySelector('img').classList.remove('skeleton');
    });
  }
}

export default Image;
