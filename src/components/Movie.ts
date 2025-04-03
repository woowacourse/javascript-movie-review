import { DEFAULT_BACK_DROP_URL } from '@/constants';
import { MovieType } from '@/types';
import { html } from '@/utils';
import Component from './core/Component';

interface MovieProps extends MovieType {}

export default class Movie extends Component<MovieProps> {
  template() {
    const { backdrop_path, id, title, vote_average } = this.props;

    const backgroundImage = backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}/${backdrop_path}`
      : './images/default_thumbnail.jpeg';

    return html`
      <li class="item" data-action="movie-detail" data-id="${id}">
        <div class="skeleton">
          <img class="thumbnail picture" alt="${title}" data-src="${backgroundImage}" src="${backgroundImage}" />
        </div>
        <div class="item-desc">
          <p class="rate yellow">
            <img src="./images/star_empty.png" class="star" />
            <span>${vote_average.toFixed(1)}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </li>
    `;
  }
}
