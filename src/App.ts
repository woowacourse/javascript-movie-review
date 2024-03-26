import Component from './components/common/Component/Component';
import MovieReviewHeader from './components/movie/MovieReviewHeader/MovieReviewHeader';
import MovieReviewBody from './components/movie/MovieReviewBody/MovieReviewBody';
import ErrorModal from './components/movie/ErrorModal/ErrorModal';
import { querySelector } from './utils/dom/selector';
import { createElement } from './utils/dom/createElement/createElement';

class App extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  private renderMovieReviewBody(movieName: string) {
    const $main = querySelector<HTMLElement>('main', this.$element);
    $main.innerHTML = '';

    new MovieReviewBody($main, { movieType: movieName });
  }

  protected createComponent() {
    const $app = createElement({ tagName: 'div', attributeOptions: { id: 'app' } });
    const $header = createElement({ tagName: 'header' });
    const $main = createElement({ tagName: 'main' });

    new MovieReviewHeader($header, { renderMovieReviewBody: this.renderMovieReviewBody });
    new MovieReviewBody($main, { movieType: 'popular' });

    $app.append($header, $main);

    new ErrorModal($app);

    return $app;
  }
}

export default App;
