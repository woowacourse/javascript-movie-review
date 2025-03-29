import { errorStore, movieRateStore, moviesStore, pageStore, searchStore } from '@/store';
import { html } from '@/utils';
import Component from './core/Component';
import ThumbnailList from './ThumbnailList';
import IntersectionObserble from './IntersectionObserble';
import MovieDetailModal from './MovieDetailModal';
import { getMovies } from '@/apis';

export default class Movies extends Component {
  override setup() {
    this.subsribe([moviesStore, errorStore, searchStore]);

    getMovies({ query: searchStore.getState(), page: pageStore.getState() });

    new MovieDetailModal({ movieRate: movieRateStore.getState() });
  }

  override template() {
    const error = errorStore.getState();
    const search = searchStore.getState();

    if (error) return html`<div class="error">${error.message}</div>`;
    return html`
      <div class="container">
        <main>
          <section>
            <h2 class="thumbnail-title">${search ? `"${search}" 검색 결과` : '지금 인기 있는 영화'}</h2>

            <slot name="thumbnail-list"> </slot>
            <slot name="obserable"></slot>
          </section>
        </main>
      </div>
    `;
  }

  override async onRender() {
    this.fillSlot(new ThumbnailList(), 'thumbnail-list');
    this.fillSlot(
      new IntersectionObserble({
        callback: async () => {
          await getMovies({ query: searchStore.getState(), page: pageStore.getState() + 1 });
        },
        id: 'movie-more',
      }),
      'obserable',
    );
  }
}
