import { errorStore, moviesStore, searchStore } from '@/store';
import { html } from '@/utils';
import Component from './core/Component';
import ThumbnailList from './ThumbnailList';

const TAB_LIST = ['상영 중', '인기순', '평점순', '상영 예정'];

export default class Movies extends Component {
  setup() {
    this.subsribe([moviesStore, errorStore, searchStore]);
  }

  template() {
    const error = errorStore.getState();
    const search = searchStore.getState();

    if (error) return html`<div class="error">${error.message}</div>`;
    return html`
      <div class="container">
        <ul class="tab">
          ${TAB_LIST.map(
            (tab) => `
              <li>
                <a href="#">
                  <div class="tab-item"><h3>${tab}</h3></div>
                </a>
              </li>
            `,
          )}
        </ul>
        <main>
          <section>
            <h2 class="thumbnail-title">${search ? `"${search}" 검색 결과` : '지금 인기 있는 영화'}</h2>
            <slot name="thumbnail-list"> </slot>

            <slot name="error"></slot>

            <div class="error close">
              <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
              <h2></h2>
            </div>
          </section>
        </main>
      </div>
    `;
  }

  async onRender() {
    this.fillSlot(new ThumbnailList(), 'thumbnail-list');
  }
}
