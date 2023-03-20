import { Movie } from '../type/Movie';

import FilledStar from '../assets/star_filled.png';

export default class MovieCard {
  $element;

  constructor($parent: Element) {
    this.$element = document.createElement('li');

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render(movie: Movie) {
    this.$element.innerHTML = this.template(movie);
  }

  template(movie: Movie) {
    const { id, title, posterPath, voteAverage } = movie;

    return /* html */ `    
      <a href="#">
        <div id=${id} class="item-card">          
          <img    
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
          loading="lazy"
          alt=${title}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src=${FilledStar} alt="별점" /> ${voteAverage}</p>
        </div>
      </a>`;
  }
}
