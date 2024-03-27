import Component from '../../common/Component/Component';
import ErrorToast from '../ErrorToast/ErrorToast';
import MovieLogo from '../MovieLogo/MovieLogo';
import { renderMovieReviewBody } from '../MovieReviewBody/MovieReviewBody.util';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import './MovieReviewHeader.css';

class MovieReviewHeader extends Component {
  protected render() {
    this.$element.append(this.createComponent());

    const $movieLogoContainer = querySelector<HTMLElement>('#movie-logo', this.$element);

    new MovieLogo($movieLogoContainer);
  }

  protected createComponent() {
    const $header = createElement({ tagName: 'header' });

    $header.innerHTML = /* html */ `
      <h1 id="movie-logo"></h1>
      <form id="search-form" class="search-box">
        <input id="search-input" type="text" placeholder="검색" />
        <button id="search-button" class="search-button">검색</button>
      </form>
    `;

    return $header;
  }

  protected setEvent(): void {
    const $searchForm = querySelector<HTMLFormElement>(ELEMENT_SELECTOR.searchForm, this.$element);

    on({ target: $searchForm, eventName: 'submit', eventHandler: this.handleSubmitForm.bind(this) });
  }

  private handleSubmitForm(event: Event) {
    event.preventDefault();

    const $searchForm = querySelector<HTMLFormElement>(ELEMENT_SELECTOR.searchForm, this.$element);
    const $searchInput = querySelector<HTMLInputElement>(ELEMENT_SELECTOR.searchInput, this.$element);

    this.handleMovieSearchResult($searchForm, $searchInput);

    $searchForm.reset();
  }

  private handleMovieSearchResult($searchForm: HTMLElement, $searchInput: HTMLInputElement) {
    const movieName = $searchInput.value;

    if (movieName === '') {
      new ErrorToast($searchForm, { errorText: '아무것도 입력하지 않았습니다. 다시 입력해주세요.' });

      $searchInput.focus();
      return;
    }

    renderMovieReviewBody(movieName);
  }
}

export default MovieReviewHeader;
