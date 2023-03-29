import { MOVIE_APP_IMG_PATH } from '../constant';

export default class BackToTop extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <button class="back-to-top">
      <img src="${MOVIE_APP_IMG_PATH.backToTop}" alt="맨 위로" />
    </button>
    `;
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
