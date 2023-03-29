import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';
import noImage from '../images/no_img.png';
import { IMovieDetailItem, IMovieItemProps } from '../types/movie';
import modal from './Modal';
import stateRender from '../renderer/StateRender';
import { removeSkeletonAfterImageLoad } from '../utils/eventCallback';
import { $ } from '../utils/dom';

class MovieCard {
  private $li: HTMLElement;
  private movie: IMovieItemProps;

  constructor(movie: IMovieItemProps) {
    this.$li = document.createElement('li');
    this.$li.setAttribute('data-movie-id', `${movie.id}`);
    this.movie = movie;

    // this.$li.addEventListener('click', async () => {
    //   const $dialog = modal.getDialog();

    //   await stateRender.renderMovieDetail(movie.id, $dialog);
    //   modal.open();
    // });

    this.render();
    this.initialEventListener();
  }

  private template() {
    const { posterPath, title, voteAverage, id } = this.movie;

    return `
      <a href="#/${id}">
        <div class = "item-card">
          <img
            class="item-thumbnail skeleton"
            src="https://image.tmdb.org/t/p/w500${posterPath}"
            loading="lazy"
            alt="${title}"
            onerror="
              this.style.border='1px solid #e2e2e2';
              src='${noImage}'
            "
          />
          <p class="item-title">${title}</p>
          <p class="item-score item-score-align-sort"><img src="${
            voteAverage && voteAverage > 5 ? starFilled : starEmpty
          }" alt="별점" /> ${voteAverage?.toFixed(1)}</p>
        </div>
      </a>
    `;
  }

  render() {
    this.$li.innerHTML = this.template();
  }

  getCardNode() {
    return this.$li;
  }

  private initialEventListener() {
    const $image = $<HTMLImageElement>('.item-thumbnail', this.$li);

    $image.addEventListener('load', removeSkeletonAfterImageLoad);
  }
}

export default MovieCard;
