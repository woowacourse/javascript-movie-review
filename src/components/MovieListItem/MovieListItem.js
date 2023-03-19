import './MovieListItem.css';
import StarFilled from '../../image/star_filled.png';

class MovieListItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const imgUrl = this.getAttribute('imgUrl');
    const title = this.getAttribute('title');
    const score = this.getAttribute('score');

    this.innerHTML = `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w200/${imgUrl}"
            loading="lazy"
            alt="${title}"
          />
          <p class="item-title">${title}</p>
          <p class="item-score">
            ${score}
            <img src="${StarFilled}" alt="별점${score}" />
          </p>
        </div>
      </a>
    </li>`;
  }
}

export default MovieListItem;
