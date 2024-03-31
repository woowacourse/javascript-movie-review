import Component from './components/common/Component/Component';
import MovieReviewHeader from './components/movie/MovieReviewHeader/MovieReviewHeader';
import MovieReviewBody from './components/movie/MovieReviewBody/MovieReviewBody';
import ErrorModal from './components/movie/ErrorModal/ErrorModal';
import { querySelector } from './utils/dom/selector';
import { createElement } from './utils/dom/createElement/createElement';

class App extends Component {
  errorModal: ErrorModal | undefined;

  protected render() {
    this.$element.append(this.createComponent());
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
}

export default App;
