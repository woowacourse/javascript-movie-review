import Component from './components/Component/Component';
import MovieReviewBody from './components/MovieReviewBody/MovieReviewBody';
import MovieReviewHeader from './components/MovieReviewHeader/MovieReviewHeader';

class App extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $app = document.createElement('div');

    const $main = document.createElement('main');

    new MovieReviewHeader($main);

    new MovieReviewBody($main, { movieType: 'popular' });

    $app.appendChild($main);

    return $app;
  }
}

export default App;
