import Component from './components/common/Component/Component';
import MovieReviewHeader from './components/movie/MovieReviewHeader/MovieReviewHeader';
import MovieReviewBody from './components/movie/MovieReviewBody/MovieReviewBody';
import ErrorModal from './components/movie/ErrorModal/ErrorModal';
import { querySelector } from './utils/dom/selector';
import { createElement } from './utils/dom/createElement/createElement';
import { UpButton } from './assets';

class App extends Component {
  errorModal: ErrorModal | undefined;

  protected render() {
    this.$element.append(this.createComponent());
    this.$element.insertAdjacentHTML('afterend', this.createFloatingButton());
    this.errorModal = new ErrorModal(this.$element);
  }

  protected createComponent() {
    const $app = createElement({ tagName: 'div', attributeOptions: { id: 'app' } });
    const $header = createElement({ tagName: 'header' });
    const $main = createElement({ tagName: 'main' });

    new MovieReviewHeader($header, { updateMovieReviewBody: this.updateMovieReviewBody.bind(this) });
    new MovieReviewBody($main, { movieType: 'popular', openErrorModal: this.openErrorModal.bind(this) });

    $app.append($header, $main);

    return $app;
  }

  private createFloatingButton() {
    return /* html */ `
      <button id="floating-button" class="floating-button">
        <img src=${UpButton} alt="위로 스크롤" />
      </button>
    `;
  }

  protected setEvent(): void {
    const $floatingButton = querySelector<HTMLButtonElement>('#floating-button');
    $floatingButton.addEventListener('click', this.scrollToTop);
  }

  private updateMovieReviewBody(movieName: string) {
    const $main = querySelector<HTMLElement>('main', this.$element);
    $main.innerHTML = '';

    new MovieReviewBody($main, { movieType: movieName, openErrorModal: this.openErrorModal.bind(this) });
  }

  private openErrorModal(error: unknown) {
    if (error instanceof Error) {
      this.errorModal?.openModal();
    }
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export default App;
