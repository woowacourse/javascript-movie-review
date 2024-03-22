import Component from '../../common/Component/Component';
import MovieReviewBody from '../MovieReviewBody/MovieReviewBody';
import ErrorToast from '../ErrorToast/ErrorToast';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { ELEMENT_SELECTOR } from '../../../constants/Selector';
import { Logo } from '../../../assets';
import './MovieReviewHeader.css';

class MovieReviewHeader extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $header = createElement({ tagName: 'header' });

    $header.innerHTML = /* html */ `
      <h1 id="movie-logo">
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
    const $searchForm = querySelector<HTMLFormElement>(ELEMENT_SELECTOR.searchform, this.$element);
    const $movieLogo = querySelector<HTMLFormElement>(ELEMENT_SELECTOR.movieLogo, this.$element);

    $searchForm.addEventListener('submit', this.handleSubmitForm.bind(this));
    $movieLogo.addEventListener('click', this.handleClickLogo);
  }

  private handleSubmitForm(event: Event) {
    event.preventDefault();

    const $searchForm = querySelector<HTMLFormElement>(ELEMENT_SELECTOR.searchform, this.$element);
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

    this.renderMovieReviewBody(movieName);
  }

  private renderMovieReviewBody(movieName: string) {
    const $section = querySelector<HTMLElement>(ELEMENT_SELECTOR.movieReviewSection);
    $section.remove();

    const $main = querySelector<HTMLElement>(ELEMENT_SELECTOR.main);
    new MovieReviewBody($main, { movieType: movieName });
  }

  private handleClickLogo() {
    window.location.reload();
  }
}

export default MovieReviewHeader;
