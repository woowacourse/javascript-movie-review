import { AppState } from '@/App';
import { html } from '@/lib/utils';
import Component from './core/Component';
import ThumbnailList from './ThumbnailList';
import { moviesStore } from '@/lib/store';

const TAB_LIST = ['상영 중', '인기순', '평점순', '상영 예정'];

interface MoviesProps {
  page: AppState['page'];
  search: AppState['search'];
  error: AppState['error'];
}

export default class Movies extends Component<MoviesProps> {
  setup() {
    this.subsribe([moviesStore]);
  }

  template() {
    if (this.props.error) return html`<div class="error">${this.props.error.message}</div>`;
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
            <h2 class="thumbnail-title">
              ${this.props.search ? `"${this.props.search}" 검색 결과` : '지금 인기 있는 영화'}
            </h2>
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
