import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';
import { IMovieItemProps } from '../types/movie';
import modal from './Modal';
import stateRender from '../renderer/StateRender';

class MovieCard {
  #$li: HTMLElement;
  #movie: IMovieItemProps;

  constructor(movie: IMovieItemProps) {
    this.#$li = document.createElement('li');
    this.#movie = movie;

    this.#$li.addEventListener('click', async () => {
      modal.open();
    });

    this.render();
    this.#initialEventListener();
  }

  #template() {
    const { posterPath, title, voteAverage } = this.#movie;

    return `
      <a href="#">
        <div class = "item-card">
          <img
            class="item-thumbnail skeleton"
            src="https://image.tmdb.org/t/p/w500${posterPath}"
            loading="lazy"
            alt="${title}"
            onerror="
              this.style.border='1px solid #e2e2e2';
              this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
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
    this.#$li.innerHTML = this.#template();
  }

  getCardNode() {
    return this.#$li;
  }

  #initialEventListener() {
    const $image = this.#$li.querySelector<HTMLImageElement>('img');
    if (!$image) return;

    $image.addEventListener('load', (e) => {
      if (!(e.currentTarget instanceof HTMLImageElement)) return;
      const { currentTarget } = e;

      if (!currentTarget.complete) return;

      currentTarget.classList.remove('skeleton');
    });
  }
}

export default MovieCard;
