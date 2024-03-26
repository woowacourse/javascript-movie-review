import './movieDetailModal.css';

import movieDetail from '../../domain/movieDetail';
import { MovieDetailResponse, StarScore } from '../../types/movie';
import { dom } from '../../utils/dom';
import FILLED_STAR from '../../assets/images/star_filled.png';
import EMPTY_STAR from '../../assets/images/star_empty.png';
import { SCORE_TEXT } from '../../constants/movie';

class MovieDetailModal {
  $target = document.createElement('div');
  stars?: Element[];

  constructor() {
    this.$target.classList.add('modal');
    this.$target.innerHTML = this.template();
    this.initStarRate();
    this.setEvent();
  }

  template() {
    return /* html */ `
        <div class='detail-modal-backdrop'></div>
        <section class='detail-modal-container'>
            <div class='title-container'>
                <p id='title'></p>
            </div>
            <div class='information-container'>
                <div class='thumbnail-container'>
                    <img id='thumbnail' class='thumbnail' src='' />
                </div>
                <div id='information' class='movie-information'>
                    <div class='movie-information-wrapper'>
                        <div class='movie-information-header'>
                            <p id='genre'></p>
                            <div class='score-container'>
                                <img class='star-icon' src=${FILLED_STAR} />
                                <p id='score'></p>
                            </div>
                        </div>
                        <div id='description' class='description'></div>
                    </div>
                    <div id='user-score' class='user-score-container'>
                        <p>내 별점</p>
                        <div id='star-container'>
                          <img data-id='1' class='user-star-icon' src=${EMPTY_STAR} />
                          <img data-id='2' class='user-star-icon' src=${EMPTY_STAR} />
                          <img data-id='3' class='user-star-icon' src=${EMPTY_STAR} />
                          <img data-id='4' class='user-star-icon' src=${EMPTY_STAR} />
                          <img data-id='5' class='user-star-icon' src=${EMPTY_STAR} />
                        </div>
                        <p id='score-number'>0</p>
                        <p id='score-text'>${SCORE_TEXT[0]}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
  }

  open(movieResponse: MovieDetailResponse) {
    const { genres, imageSrc, description, title, score } = movieDetail.create(movieResponse);

    const $thumbnail = dom.getElement<HTMLImageElement>(this.$target, '#thumbnail');
    const $description = dom.getElement(this.$target, '#description');
    const $genre = dom.getElement(this.$target, '#genre');
    const $title = dom.getElement(this.$target, '#title');
    const $score = dom.getElement(this.$target, '#score');

    $genre.textContent = genres.join(', ');
    $thumbnail.setAttribute('src', imageSrc);
    $description.textContent = description;
    $title.textContent = title;
    $score.textContent = score.toString();
    document.body.style.overflow = 'hidden';
    this.$target.classList.add('open');
  }

  close() {
    this.$target.classList.remove('open');
    document.body.style.overflow = 'unset';
  }

  setEvent() {
    const $backdrop = dom.getElement(this.$target, '.detail-modal-backdrop');
    $backdrop.addEventListener('click', () => {
      this.initStarRate();
      this.close();
    });

    const $starContainer = dom.getElement(this.$target, '#star-container');
    $starContainer.addEventListener('click', e => {
      if (e.target === e.currentTarget) return;
      const target = e.target as HTMLImageElement;
      const id = Number(target.dataset.id);
      if (typeof id === 'undefined') return;
      const $scoreNumber = dom.getElement(this.$target, '#score-number');
      const $scoreText = dom.getElement(this.$target, '#score-text');
      const score = (id * 2) as StarScore;
      $scoreNumber.textContent = score.toString();
      $scoreText.textContent = SCORE_TEXT[score];

      this.initStarRate(id);
      this.fillRate(Number(target.dataset.id));
    });
  }

  fillRate(count: number) {
    const $starContainer = dom.getElement(this.$target, '#star-container');
    const stars = [...$starContainer.children];
    for (let i = 0; i <= count - 1; i++) {
      stars[i].classList.add('filled');
      stars[i].setAttribute('src', FILLED_STAR);
    }
  }

  initStarRate(id = 0) {
    const $starContainer = dom.getElement(this.$target, '#star-container');
    const stars = [...$starContainer.children];
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('filled');
      stars[i].setAttribute('src', EMPTY_STAR);
    }

    const $scoreNumber = dom.getElement(this.$target, '#score-number');
    const $scoreText = dom.getElement(this.$target, '#score-text');
    const score = (id * 2) as StarScore;
    $scoreNumber.textContent = score.toString();
    $scoreText.textContent = SCORE_TEXT[score];
  }
}

export default MovieDetailModal;
