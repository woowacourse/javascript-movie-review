import starFilled from '../assets/star_filled';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export default class MovieCard {
  constructor($parent, movie) {
    this.$parent = $parent;
    this.movie = movie;

    this.render();
  }

  template() {
    const { poster_path, title, vote_average } = this.movie;
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${IMAGE_BASE}${poster_path}"
              loading="lazy"
              alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average}</p>
          </div>
        </a>
      </li>
    `;
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
