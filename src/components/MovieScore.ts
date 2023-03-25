import './MovieScore.css';
import STAR_FILLED from '../image/star-filled.png';
import STAR_EMPTY from '../image/star-empty.png';

class MovieScore extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    const score = Number(this.getAttribute('score'));

    this.innerHTML = /*html*/ `
    <div class="modal-score">
        ${score !== 0 ? `<img src="${STAR_FILLED}">` : `<img src="${STAR_EMPTY}">`}
        <span>${score}<span>
    </div>
    `;
  }
}

export default MovieScore;
