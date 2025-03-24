import { AppState } from '@/App';
import { Component } from './core';
import { html } from '@/lib/utils';
import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';
import { join, map, pipe, toArray } from '@fxts/core';
import LocalStorage from '@/lib/modules/LocalStorage';
import { LocalStorageMovieRateValueType } from '@/lib/types';

interface MovieDetailModalProps {
  movieDetailResponse: AppState['movieDetailResponse'];
}

const RATE_MAP = {
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export default class MovieDetailModal extends Component<MovieDetailModalProps> {
  template() {
    if (!this.props.movieDetailResponse) return html``;

    const { backdrop_path, title, release_date, genres, overview, vote_average, id } = this.props.movieDetailResponse;
    const movieRate = LocalStorage.get<LocalStorageMovieRateValueType>('movieRate');

    const currentMovieRate = movieRate[id];

    console.log(currentMovieRate);

    LocalStorage.set('movieRate', { ...(movieRate ?? {}), [id]: 8 });

    const backgroundImage = backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${backdrop_path}`
      : './images/default_thumbnail.jpeg';
    return html`
      <div class="modal-background active" id="modalBackground" data-action="close-movie-detail-modal">
        <div class="modal" data-action="not-close-movie-detail-modal">
          <button class="close-modal" id="closeModal" data-action="close-movie-detail-modal">
            <img src="./images/modal_button_close.png" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="${backgroundImage}" />
            </div>
            <div class="modal-description">
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
                <img src="./images/star_filled.png" class="star" /><span>${vote_average.toFixed(1)}</span>
              </p>
              <hr />
              <span>내 별점</span>
              ${pipe(
                Object.keys(RATE_MAP),
                map(
                  (rate) =>
                    `<img src="./images/star_${currentMovieRate >= Number(rate) ? 'filled' : 'empty'}.png" class="star" data-action="change-rate" data-id="${id}" data-rate="${rate}" />`,
                ),
                toArray,
              )}
              <span>${RATE_MAP[String(currentMovieRate)]}</span>
              <span>(${currentMovieRate}/10)</span>
              <hr />
              <p class="detail">
                <span>줄거리</span>
                ${overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
