import './movieDetailModal.css';

import movieDetail from '../../domain/movieDetail';
import { MovieDetail, MovieDetailResponse, StarScore } from '../../types/movie';
import { dom } from '../../utils/dom';
import FILLED_STAR from '../../assets/images/star_filled.png';
import EMPTY_STAR from '../../assets/images/star_empty.png';
import CLOSE_BUTTON from '../../assets/images/close_button.png';
import { SCORE_TEXT } from '../../constants/movie';
import storage from '../../utils/storage';
import Button from '../common/button/Button';

interface ScoreStorage {
  id: number;
  score: StarScore;
}

class MovieDetailModal {
  $target = document.createElement('div');
  stars?: Element[];
  movieId?: number;
  score: StarScore = 0;

  constructor() {
    this.$target.classList.add('modal');
    this.$target.innerHTML = this.template();
    this.paint();
    this.initStarRate();
    this.setEvent();
  }

  template() {
    return /* html */ `
        <div class='detail-modal-backdrop'></div>
        <section class='detail-modal-container'>
            <div class='title-container'>
              <div class='blank-container'></div>
              <p id='modal-title'></p>
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
                        <p id='description' class='description'></p>
                    </div>
                    <div id='user-score' class='user-score-container'>
                        <p>내 별점</p>
                        <div id='star-container'>
                          <img data-id='1' class='user-star-icon' />
                          <img data-id='2' class='user-star-icon' />
                          <img data-id='3' class='user-star-icon' />
                          <img data-id='4' class='user-star-icon' />
                          <img data-id='5' class='user-star-icon' />
                        </div>
                        <p id='score-number'>${this.score ?? 0}</p>
                        <p id='score-text'>${SCORE_TEXT[this.score ?? 0]}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
  }

  paint() {
    const $titleContainer = dom.getElement(this.$target, '.title-container');
    const closeButton = this.createCloseButton();
    $titleContainer.appendChild(closeButton.$target);
  }

  render({ title, imageSrc, score, description, genres }: MovieDetail) {
    const $thumbnail = dom.getElement<HTMLImageElement>(this.$target, '#thumbnail');
    const $description = dom.getElement<HTMLParagraphElement>(this.$target, '#description');
    const $genre = dom.getElement<HTMLParagraphElement>(this.$target, '#genre');
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '#modal-title');
    const $score = dom.getElement<HTMLParagraphElement>(this.$target, '#score');

    $thumbnail.setAttribute('src', imageSrc);
    $description.textContent = description;
    $genre.textContent = genres.join(', ');
    $title.textContent = title;
    $score.textContent = score.toString();
  }

  open(movieResponse: MovieDetailResponse) {
    const { id, title, imageSrc, score, description, genres } = movieDetail.create(movieResponse);
    const movies = storage.get<ScoreStorage[]>('movies');
    const movie = movies.filter(movie => movie.id === id)[0];
    const movieScore = movie?.score;
    this.movieId = id;
    this.score = movieScore ?? 0;

    this.fillRate(this.score / 2);
    this.render({ id, title, imageSrc, score, description, genres });

    document.body.style.overflow = 'hidden';
    this.$target.classList.add('open');
  }

  close() {
    this.$target.classList.remove('open');
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', this.handleModalCloseKey.bind(this));
  }

  setEvent() {
    const $backdrop = dom.getElement(this.$target, '.detail-modal-backdrop');
    const $starContainer = dom.getElement(this.$target, '#star-container');

    $backdrop.addEventListener('click', this.handleClickDimmer.bind(this));
    $starContainer.addEventListener('click', this.handleClickStar.bind(this));
    window.addEventListener('keydown', this.handleModalCloseKey.bind(this));
  }

  handleClickDimmer() {
    this.initStarRate();
    this.close();
  }

  handleClickStar(e: MouseEvent) {
    if (e.target === e.currentTarget) return;
    if (typeof this.movieId === 'undefined') return;

    const target = e.target as HTMLImageElement;
    const id = Number(target.dataset.id);
    this.updateScoreContainer(id);

    const movies = this.calculateStorageScore(id);
    storage.set('movies', movies);
    this.initStarRate(id);
    this.fillRate(id);
  }

  handleModalCloseKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  calculateStorageScore(id: number) {
    const score = (id * 2) as StarScore;
    const movies = storage.get<ScoreStorage[]>('movies');
    const isDeclared = movies.some(movie => movie.id === this.movieId);
    return isDeclared
      ? movies.map(movie => (movie.id === this.movieId ? { ...movie, score } : movie))
      : [...movies, { id: this.movieId!, score }];
  }

  fillRate(count = 0) {
    const $starContainer = dom.getElement(this.$target, '#star-container');
    const stars = [...$starContainer.children];
    Array.from({ length: count }, (_, i) => i).forEach(idx => {
      stars[idx].classList.add('filled');
      stars[idx].setAttribute('src', FILLED_STAR);
    });

    this.updateScoreContainer(count);
  }

  initStarRate(count = 0) {
    const $starContainer = dom.getElement(this.$target, '#star-container');
    [...$starContainer.children].forEach(star => {
      star.classList.remove('filled');
      star.setAttribute('src', EMPTY_STAR);
    });

    this.updateScoreContainer(count);
  }

  updateScoreContainer(count: number) {
    const $scoreNumber = dom.getElement(this.$target, '#score-number');
    const $scoreText = dom.getElement(this.$target, '#score-text');
    const score = (count * 2) as StarScore;
    $scoreNumber.textContent = score.toString();
    $scoreText.textContent = SCORE_TEXT[score];
  }

  createCloseButton() {
    const $buttonImage = document.createElement('img');
    $buttonImage.setAttribute('src', CLOSE_BUTTON);

    return new Button({
      classNames: ['close-button'],
      onClick: this.close.bind(this),
      children: [$buttonImage],
    });
  }
}

export default MovieDetailModal;
