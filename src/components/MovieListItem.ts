class MovieListItem extends HTMLElement {
  constructor() {
    super();
    const imgSrc = this.getAttribute('poster-path');
    this.innerHTML = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src=${
                imgSrc === 'null'
                  ? './default_poster.png'
                  : `https://image.tmdb.org/t/p/w220_and_h330_face${imgSrc}`
              }
              loading="lazy"
              alt="${this.getAttribute('title')}"
            />
            <p class="item-title">${this.getAttribute('title')}</p>
            <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${this.getAttribute(
              'vote-average'
            )}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default MovieListItem;
