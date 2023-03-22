import './MovieListItem.css';
import STAR_FILLED from '../image/star-filled.png';

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const SLICE_START = 0;
    const SLICE_END = 3;
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const score = this.getAttribute('score');

    this.innerHTML = `
    <li>
      <a>
        <div class="item-card">
          <movie-image imgUrl="${imgUrl}" title="${title}" width="200"></movie-image>
          <p class="item-title">${title}</p>
          <p class="item-score">
            ${score?.slice(SLICE_START, SLICE_END)}
            <img src="${STAR_FILLED}" alt="별점" />
          </p>
        </div>
      </a>
    </li>`;
  }
}

export default MovieListItem;
