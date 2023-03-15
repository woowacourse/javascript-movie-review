import StarFilled from '../../image/star_filled.png';

class MovieListItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="https://image.tmdb.org/t/p/w220_and_h330_face${this.getAttribute('poster-path')}"
              loading="lazy"
              alt="${this.getAttribute('title')}"
            />
            <p class="item-title">${this.getAttribute('title')}</p>
            <p class="item-score"><img src="${StarFilled}" alt="별점" /> ${this.getAttribute(
      'vote-average'
    )}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default MovieListItem;
