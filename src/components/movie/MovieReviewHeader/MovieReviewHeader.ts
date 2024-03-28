import Component from '../../common/Component/Component';
import ErrorToast from '../ErrorToast/ErrorToast';
import { querySelector } from '../../../utils/dom/selector';
import { Logo } from '../../../assets';
import './MovieReviewHeader.css';

interface MovieReviewHeaderProps {
  renderMovieReviewBody: (movieName: string) => void;
}

class MovieReviewHeader extends Component<MovieReviewHeaderProps> {
  protected render() {
    this.$element.innerHTML = this.createComponent();
  }

  protected createComponent() {
    return /* html */ `
      <h1 id="logo">
        <img src=${Logo} alt="MovieList 로고" />
      </h1>
      <form id="search-form" class="search-form">
        <input id="search-input" type="text" placeholder="검색" />
        <button id="search-button" class="search-button">검색</button>
      </form>
    `;
  }

  protected setEvent(): void {
    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);
    const $movieLogo = querySelector<HTMLFormElement>('#logo', this.$element);

    $searchForm.addEventListener('submit', this.handleSearchFormSubmit.bind(this));
    $movieLogo.addEventListener('click', this.handleLogoClick);
  }

  private handleSearchFormSubmit(event: Event) {
    event.preventDefault();

    const $searchForm = querySelector<HTMLFormElement>('#search-form', this.$element);
    const $searchInput = querySelector<HTMLInputElement>('#search-input', this.$element);

    if ($searchInput.offsetWidth === 0) {
      this.expandSearchForm($searchForm, $searchInput);
      return;
    }

    this.handleSearchResult($searchForm, $searchInput);

    $searchForm.reset();
  }

  private expandSearchForm($searchForm: HTMLFormElement, $searchInput: HTMLInputElement) {
    const $movieLogo = querySelector<HTMLFormElement>('#logo', this.$element);
    $movieLogo.classList.add('hide');

    $searchForm.style.width = '100%';
    $searchInput.style.width = '100%';
  }

  private handleSearchResult($searchForm: HTMLElement, $searchInput: HTMLInputElement) {
    const searchValue = $searchInput.value;

    if (searchValue === '') {
      new ErrorToast($searchForm, { errorText: '아무것도 입력하지 않았습니다. 다시 입력해주세요.' });

      $searchInput.focus();
      return;
    }

    this.props?.renderMovieReviewBody(searchValue);
  }

  private handleLogoClick() {
    window.location.reload();
  }
}

export default MovieReviewHeader;
