import template from './index.html';

class MovieModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = template;
  }
}
export default MovieModal;
