import '../styles/movieDetail.css';
import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';

import { IMovieDetailItem } from '../types/movie';
import modal from './Modal';
import { STAR_DESCRIPTION } from '../utils/constants';
import { removeSkeletonAfterImageLoad } from '../utils/eventCallback';

class MovieDetail {
  #$detainContainer: HTMLDivElement;
  #starScore: number;

  constructor() {
    this.#$detainContainer = document.createElement('div');
    this.#starScore = 0;

    this.#initialEventListener();
  }

  template({ title, overview, voteAverage, genres, posterPath }: IMovieDetailItem) {
    return `  
    <div class="header-container">
      <p class="movie-title">${title}</p>
      <button class="close-button"></button>
    </div>
    <div class="content-container">
      <img
        class="skeleton"
        src="https://image.tmdb.org/t/p/w500${posterPath}"
        loading="lazy"
        alt="${title}"
        onerror="
          this.style.border='1px solid #e2e2e2';
          this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
        "
      />
      <div class="content-info-container">
        <div class="genre-vote-rate-container">
          <p>${genres.join(', ')}</p>
          <p class="item-score-align-sort ">
            <img src="${
              voteAverage && voteAverage > 5 ? starFilled : starEmpty
            }" alt="별점" /> ${voteAverage?.toFixed(1)}
          </p>
        </div>
        <textarea readonly>${overview ?? ''}</textarea>

        <div class="vote-container">
          <span class="star-title">내 별점</span>
          <span class="star">
           ${this.starImage(starEmpty)}
            <span> ${this.starImage(starFilled)}</span>
            <input class="star-input" type="range" value="0" step="2" min="0" max="10">
          </span>
          <span class="star-description">${STAR_DESCRIPTION[this.#starScore]}</span>      
        </div>
      </div>  
    </div>`;
  }

  starImage(path: string) {
    return `<img src=${path}/>`.repeat(5);
  }

  /**
   *
   * @param movie
   * @param $target
   *
   * 렌더 조건은 다음과 같이 나뉜다.
   * 1. 처음 클릭한 경우
   * 2. localStorage에 영화 정보가 저장되어 있는 경우
   * 3. 이전에 클릭했던 데이터를 또다시 클릭한다면 ? -> 이건 그냥 modal을 클릭하는 거잖슴.
   */
  render(movie: IMovieDetailItem, $target: HTMLElement) {
    this.#$detainContainer.innerHTML = this.template(movie);
    this.#loadImageEventListener();
    $target.insertAdjacentElement('beforeend', this.#$detainContainer);
  }

  #initialEventListener() {
    this.#$detainContainer.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target.classList.contains('close-button')) modal.close();
    });

    this.#$detainContainer.addEventListener('input', (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      if (!e.target.classList.contains('star-input')) return;

      const starSpan = document.querySelector<HTMLSpanElement>('.star span');
      const starDescription = document.querySelector<HTMLSpanElement>('.star-description');

      if (!starSpan || !starDescription) return;
      this.#starScore = Number(e.target.value);

      starSpan.style.width = `${this.#starScore * 10}%`;
      starDescription.innerText = `${STAR_DESCRIPTION[this.#starScore]}`;
    });
  }

  #loadImageEventListener() {
    const $image = this.#$detainContainer.querySelector<HTMLImageElement>('img');
    if (!$image) return;
    $image.addEventListener('load', removeSkeletonAfterImageLoad, { once: true });
  }
}

export default MovieDetail;
