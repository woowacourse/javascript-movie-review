import { Movie } from '../type/Movie';

import FilledStar from '../assets/star_filled.png';
import Component from '../type/Component';

type HandlerCallback = {
  onClickCard: (movieId: string) => void;
};

export default class MovieCard implements Component {
  private $element = document.createElement('li');

  constructor($parent: Element, private handlerCallback: HandlerCallback) {
    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render(movie: Movie) {
    this.$element.innerHTML = this.template(movie);
    this.setEvent();
  }

  template(movie: Movie) {
    const { id, title, posterPath, voteAverage } = movie;

    return /* html */ `
    <div id=${id} class="item-card">          
      <img    
      class="item-thumbnail"
      src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
      loading="lazy"
      alt=${title}
      />
      <p class="item-title">${title}</p>
      <p class="item-score"><img src=${FilledStar} alt="별점" /> ${voteAverage}</p>
    </div>`;
  }

  setEvent() {
    this.$element.addEventListener('click', this.onClickCard.bind(this));
  }

  onClickCard(e: MouseEvent) {
    const target = e.target as Element;
    const $li = target.closest('.item-card');
    if (!$li) return;

    const movieId = $li.id;

    this.handlerCallback.onClickCard(movieId);
  }
}
