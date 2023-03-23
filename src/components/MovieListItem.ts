import DefaultPoster from '../../image/default_poster.png';
import StarFilled from '../../image/star_filled.png';

class MovieListItem extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const posterPath = this.getAttribute('poster-path');
    this.innerHTML = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail skeleton"
              src=${
                posterPath === 'null'
                  ? DefaultPoster
                  : `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`
              }
              loading="lazy"
              alt="${this.getAttribute('title')}"
            />
            <p class="item-title">
              ${this.getAttribute('title')}
            </p>
            <p class="item-score">
              <img src="${StarFilled}" alt="별점" /> 
              ${this.getAttribute('vote-average')}
            </p>
          </div>
        </a>
      </li>
    `;
  }

  connectedCallback() {
    this.querySelector('.item-thumbnail')?.addEventListener('load', this.onLoad);
  }

  onLoad = () => {
    this.querySelector('.item-thumbnail')?.classList.remove('skeleton');
  };
}

export default MovieListItem;
