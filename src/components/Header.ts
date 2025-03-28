import { getMovies } from '@/apis';
import { DEFAULT_BACK_DROP_URL } from '@/constants';
import { eventHandlerInstance } from '@/modules';
import { moviesResponseStore, moviesStore, pageStore, searchStore } from '@/store';
import { html, isHTMLFormElement } from '@/utils';
import Component from './core/Component';

export default class Header extends Component {
  override setup() {
    this.subsribe([moviesStore, searchStore]);
  }

  override template() {
    const firstMovie = moviesStore.getState()?.at(0);
    const search = searchStore.getState();

    return html`
      <header class="background-container">
        ${search ? '' : '<div class="overlay" aria-hidden="true"></div>'}
        <div class="top-rated-header">
          <a href="/javascript-movie-review">
            <h1 class="logo">
              <img src="./images/logo.png" alt="MovieList" />
            </h1>
          </a>
          <form class="top-rated-search" data-action="submit-search">
            <input
              id="top-rated-search-input"
              class="top-rated-search-input"
              placeholder="검색어를 입력하세요"
              name="search"
              value="${search}"
            />
            <button type="submit" class="top-rated-search-button">
              <img src="./images/search.svg" alt="MovieSearch" />
            </button>
          </form>
        </div>
        ${firstMovie && !search
          ? `
          <div class="top-rated-container">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${firstMovie.vote_average}</span>
            </div>
            <div class="title">${firstMovie.title}</div>
            <button class="primary" data-action="show-detail">자세히 보기</button>
          </div>
          `
          : ''}
      </header>
    `;
  }

  override onRender() {
    this.setHeaderBackground();
  }

  override addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: async ({ target }) => {
        if (!isHTMLFormElement(target)) return;

        const formData = new FormData(target);
        const modalInput = Object.fromEntries(formData);

        pageStore.setState(1);
        searchStore.setState(String(modalInput.search));
        moviesStore.setState(null);

        await getMovies({ query: searchStore.getState(), page: pageStore.getState() });
      },
      dataAction: 'submit-search',
    });
  }

  setHeaderBackground() {
    const firstMovie = moviesStore.getState()?.at(0);
    const search = searchStore.getState();

    if (!firstMovie) return;

    if (search) this.element!.style.backgroundImage = '';
    else if (firstMovie.backdrop_path)
      this.element!.style.backgroundImage = `url(${DEFAULT_BACK_DROP_URL}/${firstMovie.backdrop_path})`;
  }
}
