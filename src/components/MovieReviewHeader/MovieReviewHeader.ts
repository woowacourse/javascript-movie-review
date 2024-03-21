import Component from '../common/Component/Component';
import MovieReviewBody from '../MovieReviewBody/MovieReviewBody';
import { createElement } from '../../utils/dom/createElement/createElement';
import { querySelector } from '../../utils/dom/selector';
import { on } from '../../utils/dom/eventListener/eventListener';
import { Logo } from '../../assets';
import ErrorToast from '../common/ErrorToast/ErrorToast';

class MovieReviewHeader extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $header = createElement({ tagName: 'header' });

    $header.innerHTML = /* html */ `
      <h1>
        <img src=${Logo} alt="MovieList 로고" />
        </h1>
      <form id="search-form" class="search-box">
        <input id="search-input" type="text" placeholder="검색" />
        <button id="search-button" class="search-button">검색</button>
      </form>
    `;

    return $header;
  }

  protected setEvent(): void {
    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);

    on({ target: $searchForm, eventName: 'submit', eventHandler: this.handleSubmitForm.bind(this) });
  }

  private handleSubmitForm(event: Event) {
    event.preventDefault();

    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);
    const $searchInput = querySelector<HTMLInputElement>('#search-input', this.$element);

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

    this.renderMovieReviewBody(movieName);
  }

  private renderMovieReviewBody(movieName: string) {
    const $section = querySelector<HTMLElement>('.item-view');
    $section.remove();

    const $main = querySelector<HTMLElement>('main');
    new MovieReviewBody($main, { movieType: movieName });
  }
}

export default MovieReviewHeader;
