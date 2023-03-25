import '../styles/movieDetail.css';
import starFilled from '../images/star_filled.png';
import starEmpty from '../images/star_empty.png';

import { IMovieDetailItem } from '../types/movie';
import modal from './Modal';
import { STAR_DESCRIPTION } from '../utils/constants';
import { removeSkeletonAfterImageLoad } from '../utils/eventCallback';
import { eventThrottle } from '../utils/throttle';
import { parseLocalStorage, stringifyLocalStorage } from '../utils/localStorage';

const initialMovieState: IMovieDetailItem = {
  title: '',
  overview: null,
  voteAverage: 0,
  movieId: -1,
  genres: [],
  posterPath: null,
  myStarScore: 0,
};

class MovieDetail {
  #$detainContainer: HTMLDivElement;
  #movieState: IMovieDetailItem;

  constructor() {
    this.#$detainContainer = document.createElement('div');
    this.#$detainContainer.className = 'movie-detail-container';
    this.#movieState = initialMovieState;

    this.#initialEventListener();
  }

  #template({ title, overview, voteAverage, genres, posterPath, myStarScore }: IMovieDetailItem) {
    const score = myStarScore ?? 0;

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
        <textarea readonly>${overview ?? '줄거리가 없습니다.'}</textarea>

        <div class="vote-container">
          <span class="star-title">내 별점</span>
          <div class=star-box">
            ${this.getActiveStarLabel(score)}
          </div>
          <span class="star-description">${score ? `${score}점 ` : ''} 
          <span class="description">${STAR_DESCRIPTION[score ?? 0]}</span>
      </span>      
        </div>
      </div>  
    </div>`;
  }

  getActiveStarLabel(score: number) {
    const labelMap = Array.from({ length: 5 }, (_, index) => {
      const value = (index + 1) * 2;
      return `<label class="star ${
        value === score ? 'star-active' : ''
      }"><input value="${value}"/></label>`;
    });

    return labelMap.join('');
  }

  render(movie: IMovieDetailItem, $target: HTMLElement) {
    if (movie.movieId === this.#movieState.movieId) return;

    this.#movieState = { ...movie };
    this.#$detainContainer.innerHTML = this.#template(movie);
    this.#loadImageEventListener();
    $target.insertAdjacentElement('beforeend', this.#$detainContainer);
  }

  #initialEventListener() {
    this.#$detainContainer.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target.classList.contains('close-button')) modal.close();
      if (e.target instanceof HTMLLabelElement) {
        const $stars = document.querySelectorAll('.star');
        $stars.forEach((element) => element.classList.remove('star-active'));
        e.target.classList.add('star-active');
        const score = e.target.querySelector('input')?.value ?? 0;
        this.#changeStarState(Number(score));
        this.#saveMovieScoreInLocalStorage();
      }
    });
  }

  #loadImageEventListener() {
    const $image = this.#$detainContainer.querySelector<HTMLImageElement>('img');
    if (!$image) return;
    $image.addEventListener('load', removeSkeletonAfterImageLoad, { once: true });
  }

  #changeStarState(value: number) {
    const starDescription = document.querySelector<HTMLSpanElement>('.star-description');

    if (!starDescription) return;
    this.#movieState.myStarScore = value;
    starDescription.innerHTML = `${value ? `${value}점 ` : ''} 
    <span class="description">${STAR_DESCRIPTION[value ?? 0]}</span>`;
  }

  #saveMovieScoreInLocalStorage() {
    const movieState = this.#movieState;
    const currentMovieInfos = parseLocalStorage<Array<IMovieDetailItem>>({
      key: 'movieList',
      data: [],
    });

    const { movieId } = this.#movieState;

    const data = this.isExistCurrentMovieDetail(currentMovieInfos, movieId)
      ? currentMovieInfos.map((movieInfo) =>
          movieInfo.movieId === movieState.movieId ? { ...movieState } : movieInfo
        )
      : [...currentMovieInfos, { ...movieState }];
    stringifyLocalStorage<Array<IMovieDetailItem>>({ key: 'movieList', data });
  }

  isExistCurrentMovieDetail(movies: Array<IMovieDetailItem>, id: IMovieDetailItem['movieId']) {
    const currentItem = movies.find(({ movieId }) => movieId === id);

    return currentItem;
  }
}

export default MovieDetail;
