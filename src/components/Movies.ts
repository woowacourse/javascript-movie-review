import { MovieApiClient } from '@/apis';
import { errorMessage, eventHandlerInstance } from '@/modules';
import { movieDetailResponseStore, moviesStore, serverStore } from '@/store';
import { $, html } from '@/utils';
import { forEach } from '@fxts/core';
import { MOVIE_ITEM_PER_PAGE } from '../constants';
import Component from './core/Component';
import Movie from './Movie';

export default class Movies extends Component {
  override template() {
    const movies = moviesStore.getState();

    if (movies === null)
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
        <slot name="thumbnail-list"></slot>
        ${movies.map((movie) => new Movie(movie).template())}
      </ul>
    `;
  }

  override addEventListener() {
    forEach(
      (thumbnail) => (thumbnail as HTMLElement).addEventListener('load', () => thumbnail.classList.remove('picture')),
      this.element.querySelectorAll('img.thumbnail'),
    );

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: async ({ currentTarget }) => {
        if (!currentTarget.dataset.id) throw new Error(errorMessage.get('dataId'));

        const id = Number(currentTarget.dataset.id);

        const movieDetailResponse = await serverStore.query({
          queryFn: () => MovieApiClient.getDetail({ id }),
          queryKey: ['movie-detail', id],
        });
        movieDetailResponseStore.setState(movieDetailResponse);
      },
      dataAction: 'movie-detail',
    });
  }
}
