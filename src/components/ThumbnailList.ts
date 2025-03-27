import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';

import { moviesResponseStore } from '@/lib/store';
import { html } from '@/lib/utils';
import { forEach } from '@fxts/core';
import { MOVIE_ITEM_PER_PAGE } from '../lib/constants';
import Component from './core/Component';

export default class ThumbnailList extends Component {
  setup() {
    this.subsribe([moviesResponseStore]);
  }

  template() {
    const movies = moviesResponseStore.getState()?.results;

    if (!movies)
      return html`
        <ul class="thumbnail-list">
          ${new Array(MOVIE_ITEM_PER_PAGE).fill(null).map(
            () => `
              <li class="item">
                <div class="skeleton" style="width:200px; height:300px"></div>
                <div class="item-desc">
                  <div class="skeleton" style="width:60px; height:16px"></div>
                  <div class="skeleton" style="width:150px; height:16px"></div>
                </div>
              </li>`,
          )}
        </ul>
      `;
    if (movies.length === 0)
      return html`
        <div class="result-not-found">
          <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
          <div>
            <h2>검색 결과를 찾지 못하였습니다.</h2>
            <p>단어의 철자가 정확한지 확인해 보세요.</p>
            <p>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</p>
            <p>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</p>
          </div>
        </div>
      `;
    return html`
      <ul class="thumbnail-list">
        ${movies.map((movie) => {
          const backgroundImage = movie.backdrop_path
            ? `${DEFAULT_BACK_DROP_URL}/${movie.backdrop_path}`
            : './images/default_thumbnail.jpeg';
          return `
              <li class="item" data-action="movie-detail" data-id="${movie.id}">
                <div class="thumbnail skeleton">
                  <img
                    class="thumbnail picture"
                    alt="${movie.title}"
                    data-src="${backgroundImage}"
                    src="${backgroundImage}"
                  />
                </div>
                <div class="item-desc">
                  <p class="rate yellow">
                    <img src="./images/star_empty.png" class="star" />
                    <span>${movie.vote_average.toFixed(1)}</span>
                  </p>
                  <strong>${movie.title}</strong>
                </div>
              </li>
          `;
        })}
      </ul>
    `;
  }

  onRender(): void {
    forEach(
      (thumbnail) =>
        (thumbnail as HTMLElement).addEventListener('load', () => {
          thumbnail.className = 'thumbnail loaded';
        }),
      this.element.querySelectorAll('img.thumbnail'),
    );
  }
}
