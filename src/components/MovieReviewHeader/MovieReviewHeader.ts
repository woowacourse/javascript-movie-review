import Component from '../Component/Component';
import MovieReviewBody from '../MovieReviewBody/MovieReviewBody';
import { createElement } from '../../utils/dom/createElement/createElement';
import { querySelector } from '../../utils/dom/selector';
import { on } from '../../utils/dom/eventListener/eventListener';
import { Logo } from '../../assets';

interface MovieReviewHeaderProps {
  handleData: (name: string) => void;
}

class MovieReviewHeader extends Component<MovieReviewHeaderProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected setEvent(): void {
    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);

    on({ target: $searchForm, eventName: 'submit', eventHandler: this.handleSearchMovieResult.bind(this) });
  }

  private handleSearchMovieResult(event: Event) {
    event.preventDefault();

    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);

    const $searchInput = querySelector<HTMLInputElement>('#search-input', this.$element);
    const movieName = $searchInput.value;

    if (movieName === '') {
      this.renderErrorToast($searchForm, '아무것도 입력하지 않았습니다. 다시 입력해주세요.');
      $searchInput.focus();
      return;
    }

    this.renderMovieReviewBody(movieName);
    $searchForm.reset();
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

  private renderErrorToast($searchForm: HTMLElement, errorText: string) {
    const errorToast = createElement({
      tagName: 'div',
      text: errorText,
      attributeOptions: { class: 'toast' },
    });

    $searchForm.insertAdjacentElement('afterbegin', errorToast);

    setTimeout(() => {
      errorToast.classList.add('remove-toast');
      setTimeout(() => {
        $searchForm.removeChild(errorToast);
      }, 1000);
    }, 500);
  }

  private renderMovieReviewBody(movieName: string) {
    const $section = querySelector<HTMLElement>('.item-view');
    $section.remove();

    const $main = querySelector<HTMLElement>('main');
    new MovieReviewBody($main, { movieType: movieName });
  }
}

export default MovieReviewHeader;
