import './Movie.css';
import StarFilled from '../image/star_filled.png';

class Movie extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const score = this.getAttribute('score');
    console.log(imgUrl);

    this.innerHTML = `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${imgUrl}"
            loading="lazy"
            alt="${title}"
          />
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
