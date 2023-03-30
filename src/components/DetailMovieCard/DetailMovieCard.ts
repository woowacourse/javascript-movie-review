import { personalVoteHandler } from '../../index';

import { DetailMovie } from '../../type/Movie';

import { $ } from '../../utils';

import filledStarIcon from '../../assets/star_filled.png';
import emptyStarIcon from '../../assets/star_empty.png';
import { StarCount } from '../../domain/PersonalVoteHandler';

import './detailMovieCard.css';

const voteScoreText = {
  0: '이 영화는...🤔',
  2: '최악이예요🤮',
  4: '별로예요😟',
  6: '보통이에요😐',
  8: '재미있어요🙂',
  10: '명작이에요😎',
} as const;

type StarScore = keyof typeof voteScoreText;

const STAR_BUTTON_COUNT = 5;

export default class DetailMovieCard {
  constructor(private $parent: Element) {}

  render(detailMovieData: DetailMovie, starCount: StarCount) {
    this.$parent.insertAdjacentHTML('beforeend', this.template(detailMovieData, starCount));
    this.setEvent();
  }

  template(detailMovieData: DetailMovie, starCount: StarCount) {
    const { id, title, posterPath, voteAverage, overview, genres } = detailMovieData;
    const posterSrc = `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`;

    return /* html */ `
    <section id="${id}" class="movie-detail-view">
    <div class="movie-title-wrap">
      <h1 class="movie-title">${title}</h1>
    </div>
    <div class="movie-content-container">
      <div class="movie-img-wrap">
        <img class="movie-img" src=${posterSrc} alt="${title}" />
      </div>
      <div class="movie-info-container">
        <div class="movie-info-text-container">
          <div>
            <span class="movie-info-genre">${genres.join(', ')}</span>
            <img src=${filledStarIcon} alt="star-icon" />
            <span class="movie-info-score">${voteAverage.toFixed(1)}</span>
          </div>
          <div class="movie-info-description">${overview}</div>          
        </div>
        <div class="movie-vote-container">
          ${this.voteContainerTemplate(starCount)}
        </div>       
      </div>
    </div>
    </section>`;
  }

  setEvent() {
    this.bindVoteButtonClickEvent();
  }

  voteContainerTemplate(starCount: StarCount) {
    return `
      <span class="movie-vote-title">내 별점</span>
      <div class="movie-vote-button-container">
        ${this.buttonContainerTemplate(starCount)}
      </div>
      ${this.voteScoreTemplate(starCount)}`;
  }

  buttonContainerTemplate(starCount: StarCount) {
    return Array.from({ length: STAR_BUTTON_COUNT }, (_, idx) => {
      if (starCount > idx) {
        return `
      <button type="button" data-star-count="${idx + 1}" class="movie-vote-button">
        <img src=${filledStarIcon} alt="star-icon-filled" />
      </button>`;
      }

      return `
      <button type="button" data-star-count="${idx + 1}" class="movie-vote-button">
        <img src=${emptyStarIcon} alt="star-icon-empty" />
      </button>`;
    }).join('');
  }

  voteScoreTemplate(starCount: StarCount) {
    const score = (starCount * 2) as StarScore;
    const scoreText = voteScoreText[score];
    return `<span class="movie-vote-score">${score}점</span><span>- ${scoreText}</span>`;
  }

  bindVoteButtonClickEvent() {
    const $movieVoteContainer = $('.movie-vote-container');
    if (!$movieVoteContainer) return;

    $movieVoteContainer.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;

      const $button = e.target.closest<HTMLButtonElement>('.movie-vote-button');
      if (!$button) return;

      const starCount = Number($button.dataset.starCount) as StarCount;

      const $movieDetailView = $('.movie-detail-view');
      if (!$movieDetailView) return;
      const movieId = $movieDetailView.id;

      personalVoteHandler.updatePersonalVoteData(movieId, starCount);

      $movieVoteContainer.innerHTML = this.voteContainerTemplate(starCount);
    });
  }
}
