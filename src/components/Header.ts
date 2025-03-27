import { DEFAULT_BACK_DROP_URL } from '@/constants';
import { moviesResponseStore, moviesStore, pageStore, searchStore } from '@/store';
import { html, isHTMLFormElement } from '@/utils';
import Component from './core/Component';
import { eventHandlerInstance } from '@/modules';
import { getMovie } from '@/hooks';

export default class Header extends Component {
  setup() {
    this.subsribe([moviesResponseStore, searchStore]);
  }

  override template() {
    const movie = moviesResponseStore.getState()?.results.at(0);
    const search = searchStore.getState();
    console.log(search);

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
        ${movie && !search
          ? `
          <div class="top-rated-container">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${movie.vote_average}</span>
            </div>
            <div class="title">${movie.title}</div>
            <button class="primary" data-action="show-detail">자세히 보기</button>
          </div>
          `
          : ''}
      </header>
    `;
  }

  onRender() {
    this.setHeaderBackground();
  }

  addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: async ({ target }) => {
        if (!isHTMLFormElement(target)) return;

        const formData = new FormData(target);
        const modalInput = Object.fromEntries(formData);

        pageStore.setState(1);
        searchStore.setState(String(modalInput.search));
        moviesStore.setState([]);
        await getMovie(String(modalInput.search), pageStore.getState());
      },
      dataAction: 'submit-search',
    });
  }

  setHeaderBackground() {
    const movie = moviesResponseStore.getState()?.results.at(0);
    const search = searchStore.getState();

    if (!movie) return;

    if (search) this.element!.style.backgroundImage = '';
    else if (movie.backdrop_path)
      this.element!.style.backgroundImage = `url(${DEFAULT_BACK_DROP_URL}/${movie.backdrop_path})`;
  }
}
