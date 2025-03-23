import { html } from '@/lib/utils';
import Component from './core/Component';
import { DEFAULT_BACK_DROP_URL } from '@/lib/constants';

interface HeaderProps {
  search: string;
  backgroundImage?: string;
}
export default class Header extends Component<HeaderProps> {
  override template() {
    return html`
      <header class="background-container">
        ${this.props.search ? '' : '<div class="overlay" aria-hidden="true"></div>'}
        <div class="top-rated-header">
          <a href="/javascript-movie-review">
            <h1 class="logo">
              <img src="./images/logo.png" alt="MovieList" />
            </h1>
          </a>
          <form class="top-rated-search">
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

        ${this.props.search ? '' : '<div class="top-rated-container"></div>'}
      </header>
    `;
  }

  onRender() {
    if (this.props.search) this.element!.style.backgroundImage = '';
    else if (this.props.backgroundImage)
      this.element!.style.backgroundImage = `url(${DEFAULT_BACK_DROP_URL}${this.props.backgroundImage})`;
  }
}
