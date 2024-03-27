import Component from './components/common/Component/Component';
import MovieReviewHeader from './components/movie/MovieReviewHeader/MovieReviewHeader';
import MovieReviewBody from './components/movie/MovieReviewBody/MovieReviewBody';
import ErrorFallbackModal from './components/movie/ErrorFallbackModal/ErrorFallbackModal';
import MovieReviewDetailModal from './components/movie/MovieReviewDetailModal/MovieReviewDetailModal';

import { createElement } from './utils/dom/createElement/createElement';
import { querySelector } from './utils/dom/selector';

import { ELEMENT_SELECTOR } from './constants/selector';

class App extends Component {
  private movieReviewBody: MovieReviewBody | undefined;

  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $app = createElement({ tagName: 'div', attributeOptions: { id: 'app' } });
    const $main = createElement({ tagName: 'main' });

    $main.appendChild(
      createElement({ tagName: 'div', attributeOptions: { id: 'observer-target', class: 'observer-target' } }),
    );

    new MovieReviewHeader($main);
    this.movieReviewBody = new MovieReviewBody($main, { movieType: 'popular' });

    $app.appendChild($main);

    new ErrorFallbackModal($app);

    new MovieReviewDetailModal($app);

    return $app;
  }

  protected setEvent() {
    const $searchForm = querySelector(ELEMENT_SELECTOR.searchForm, this.$element);

    $searchForm.addEventListener('submit', () => {
      this.movieReviewBody?.removeScroll();
    });
  }
}

export default App;
