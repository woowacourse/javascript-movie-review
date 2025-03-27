import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';
import { LocalStorageMovieRateValueType } from '@/lib/modules/LocalStorage/type';
import { moviesDetailStore } from '@/lib/store';
import { html } from '@/lib/utils';
import { join, map, pipe, toArray } from '@fxts/core';
import Modal from './common/Modal';

interface MovieDetailModalProps {
  movieRate: LocalStorageMovieRateValueType;
}

const RATE_MAP: Record<number, string> = {
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export default class MovieDetailModal extends Modal<MovieDetailModalProps> {
  override id = 'movie-detail-modal';

  setup() {
    this.subsribe([moviesDetailStore]);
  }

  template() {
    const movieDetail = moviesDetailStore.getState();

    if (!movieDetail) return html`<div></div>`;

    const { backdrop_path, title, release_date, genres, overview, vote_average, id } = movieDetail;

    const currentMovieRate = this.props.movieRate[id] ?? 6;

    const backgroundImage = backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}/${backdrop_path}`
      : './images/default_thumbnail.jpeg';
    return html`
      <div class="modal-background active" id="modalBackground" data-action="close-movie-detail-modal-outside">
        <div class="modal" data-action="not-close-movie-detail-modal">
          <button class="close-modal" id="closeModal" data-action="close-movie-detail-modal-button">
            <img src="./images/modal_button_close.png" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="${backgroundImage}" />
            </div>
            <div class="modal-description">
              <div class="main-info">
                <h2>${title}</h2>
                <p class="category">
                  ${new Date(release_date).getFullYear()} ·
                  ${pipe(
                    map((genre) => genre.name, genres),
                    join(', '),
                  )}
                </p>
                <p class="rate">
                  <span>평균</span>
                  <img src="./images/star_filled.png" class="star" /><span class="yellow"
                    >${vote_average.toFixed(1)}</span
                  >
                </p>
              </div>
              <hr />
              <div class="my-rate">
                <p class="sub-title">내 별점</p>
                <div class="main">
                  <div>
                    ${pipe(
                      Object.keys(RATE_MAP),
                      map(
                        (rate) =>
                          `<img src="./images/star_${currentMovieRate >= Number(rate) ? 'filled' : 'empty'}.png" class="star" data-action="change-rate" data-id="${id}" data-rate="${rate}" />`,
                      ),
                      toArray,
                    )}
                  </div>
                  <p>
                    <span>${RATE_MAP[currentMovieRate]}</span>
                    <span>(${currentMovieRate}/10)</span>
                  </p>
                </div>
              </div>
              <hr />
              <div class="detail">
                <p class="sub-title">줄거리</p>
                ${overview}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onRender() {
    this.disableScrollOutside();
  }

  protected onUnmount() {
    this.enableScrollOutside();
  }
}
