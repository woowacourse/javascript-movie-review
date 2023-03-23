import '../styles/movieDetail.css';
import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';

import { IMovieDetailItem } from '../types/movie';
import modal from './Modal';

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
            <input class="star-input" type="range" value="1" step="1" min="0" max="5">
          </span>
          <span class="star-description">${this.getStarDescriptionEachStar(
            this.#starScore
          )}</span>      
        </div>
      </div>  
    </div>`;
  }

  starImage(path: string) {
    return `<img src=${path}/>`.repeat(5);
  }

  getStarDescriptionEachStar(score: number) {
    switch (score) {
      case 0:
        return '별점을 주지 않았습니다.';
      case 2:
        return '2점 최악이예요.';
      case 4:
        return '4점 별로예요.';
      case 6:
        return '6점 보통이에요.';
      case 8:
        return '8점 재미있어요.';
      case 10:
        return '10점 명작이에요.';
    }
  }

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

      starSpan.style.width = `${this.#starScore * 20}%`;
      starDescription.innerText = `${this.getStarDescriptionEachStar(this.#starScore * 2)}`;
    });
  }

  #loadImageEventListener() {
    const $image = this.#$detainContainer.querySelector<HTMLImageElement>('img');
    if (!$image) return;
    $image.addEventListener(
      'load',
      (e) => {
        if (!(e.currentTarget instanceof HTMLImageElement)) return;
        const { currentTarget } = e;
        if (!currentTarget.complete) return;

        currentTarget.classList.remove('skeleton');
      },
      { once: true }
    );
  }
}

export default MovieDetail;
