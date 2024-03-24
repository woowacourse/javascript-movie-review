import Component from './components/common/Component/Component';
import MovieReviewHeader from './components/movie/MovieReviewHeader/MovieReviewHeader';
import MovieReviewBody from './components/movie/MovieReviewBody/MovieReviewBody';
import ErrorFallbackModal from './components/movie/ErrorFallbackModal/ErrorFallbackModal';

import { createElement } from './utils/dom/createElement/createElement';

class App extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $app = createElement({ tagName: 'div', attributeOptions: { id: 'app' } });
    const $main = createElement({ tagName: 'main' });

    new MovieReviewHeader($main);
    new MovieReviewBody($main, { movieType: 'popular' });

    $app.appendChild($main);

    new ErrorFallbackModal($app);

    return $app;
  }
}

export default App;
