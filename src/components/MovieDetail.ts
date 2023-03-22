import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';

import { IMovieDetailItem } from '../types/movie';
import modal from './Modal';

class MovieDetail {
  #$detainContainer: HTMLDivElement;

  constructor() {
    this.#$detainContainer = document.createElement('div');

    const $closeButton = document.createElement('button');
    $closeButton.className = 'modal-close-button';

    $closeButton.addEventListener('click', () => {
      modal.close();
    });
    this.#$detainContainer?.appendChild($closeButton);
  }

  template({ title, overview, voteAverage, genres, posterPath }: IMovieDetailItem) {
    return `  
    <div>
      <p>${title}</p>
    </div>
    <div>
    <img
      src="https://image.tmdb.org/t/p/w500${posterPath}"
      loading="lazy"
      alt="${title}"
      onerror="
        this.style.border='1px solid #e2e2e2';
        this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
      "
    />
      <div>
        <div>
          <p>${genres.join(', ').slice(-1)}</p>
          <p><img src="${
            voteAverage && voteAverage > 5 ? starFilled : starEmpty
          }" alt="별점" /> ${voteAverage?.toFixed(1)}</p>
        </div>
        <textarea>${overview ?? ''}</textarea>

        <div>
          
        </div>
      </div>  
    </div>`;
  }

  render(movie: IMovieDetailItem, $target: HTMLElement) {
    this.#$detainContainer.innerHTML = this.template(movie);

    $target.insertAdjacentElement('beforeend', this.#$detainContainer);
  }
}

export default MovieDetail;
