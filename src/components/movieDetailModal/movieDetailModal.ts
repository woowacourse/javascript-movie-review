import './movieDetailModal.css';

import movieDetail from '../../domain/movieDetail';
import { MovieDetailResponse } from '../../types/movie';
import { dom } from '../../utils/dom';
import FILLED_STAR from '../../assets/images/star_filled.png';
import EMPTY_STAR from '../../assets/images/star_empty.png';

class MovieDetailModal {
  $target = document.createElement('div');

  constructor() {
    this.$target.classList.add('modal');
    this.$target.innerHTML = this.template();

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
                        <img class='star-icon' src=${EMPTY_STAR} />
                        <img class='star-icon' src=${EMPTY_STAR} />
                        <img class='star-icon' src=${EMPTY_STAR} />
                        <img class='star-icon' src=${EMPTY_STAR} />
                        <img class='star-icon' src=${EMPTY_STAR} />
                        <p id='score-number'>6</p>
                        <p id='score-text'>보통이예요</p>
                    </div>
                </div>
            </div>
        </section>
    `;
  }

  open(movieResponse: MovieDetailResponse) {
    this.$target.classList.add('open');
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
  }

  close() {
    this.$target.classList.remove('open');
  }

  setEvent() {
    const $backdrop = dom.getElement(this.$target, '.detail-modal-backdrop');
    $backdrop.addEventListener('click', this.close.bind(this));
  }
}

export default MovieDetailModal;
