import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';
import { moviesResponseStore } from '@/lib/store';
import { html } from '@/lib/utils';
import Component from './core/Component';

interface HeaderProps {
  search: string;
}

export default class Header extends Component<HeaderProps> {
  setup() {
    this.subsribe([moviesResponseStore]);
  }

  override template() {
    const movie = moviesResponseStore.getState()?.results.at(0);

    return html`
      <header class="background-container">
        ${this.props.search ? '' : '<div class="overlay" aria-hidden="true"></div>'}
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
              value="${this.props.search}"
            />
            <button type="submit" class="top-rated-search-button">
              <img src="./images/search.svg" alt="MovieSearch" />
            </button>
          </form>
        </div>
        ${movie && !this.props.search
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

  setHeaderBackground() {
    const movie = moviesResponseStore.getState()?.results.at(0);

    if (!movie) return;

    if (this.props.search) this.element!.style.backgroundImage = '';
    else if (movie.backdrop_path)
      this.element!.style.backgroundImage = `url(${DEFAULT_BACK_DROP_URL}/${movie.backdrop_path})`;
  }
}
