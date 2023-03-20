import starFilled from '../assets/star_filled.png';
import { Movie } from '../service/types';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export default class MovieCard {
  $parent: HTMLElement;
  movie: Movie;

  constructor($parent: HTMLElement, movie: Movie) {
    this.$parent = $parent;
    this.movie = movie;
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
            <p class="item-score"><img src="${starFilled}" alt="별점" /><span class='item-vote-average'>${vote_average}</span></p>
          </div>
        </a>
      </li>
    `;
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
