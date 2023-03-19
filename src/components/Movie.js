import './Movie.css';
import StarFilled from '../image/star_filled.png';
import { createUniqueId } from '../utils/common';

class Movie extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const score = this.getAttribute('score');
    const id = createUniqueId();

    this.innerHTML = `
    <li>
      <a href="#">
        <div class="item-card">
          <movie-image imgId="${id}" imgUrl="${imgUrl}" title="${title}" width="200"></movie-image>
          <p class="item-title">${title}</p>
          <p class="item-score">
            ${score}
            <img src="${StarFilled}" alt="별점" />
          </p>
        </div>
      </a>
    </li>`;
  }
}

export default Movie;
