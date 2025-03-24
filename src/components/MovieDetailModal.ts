import { AppState } from '@/App';
import { Component } from './core';
import { html } from '@/lib/utils';
import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';
import { join, map, pipe } from '@fxts/core';

interface MovieDetailModalProps {
  movieDetailResponse: AppState['movieDetailResponse'];
}

export default class MovieDetailModal extends Component<MovieDetailModalProps> {
  template() {
    if (!this.props.movieDetailResponse) return html``;

    const { backdrop_path, title, release_date, genres, overview, vote_average } = this.props.movieDetailResponse;

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
                ${release_date} ·
                ${pipe(
                  map((genre) => genre.name, genres),
                  join(', '),
                )}
              </p>
              <p class="rate"><img src="./images/star_filled.png" class="star" /><span>${vote_average}</span></p>
              <hr />
              <p class="detail">${overview}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
