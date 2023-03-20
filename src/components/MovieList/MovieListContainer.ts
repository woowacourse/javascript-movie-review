import Component from '../core/Component';

// components
import MovieItem from '../MovieItem';
import MoviePopularList from './MoviePopularList';
import MovieSearchList from './MovieSearchList';

export default class MovieListContainer extends Component {
  $target;

  state;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
    this.state = this.useState();
  }

  fetchData() {
    new MoviePopularList(this.$target).emit();
    new MovieSearchList(this.$target).emit(this.state.getValue('query'));
  }

  template() {
    return this.state
      .getValue('movies')
      .map((movie) => new MovieItem().template(movie))
      .join('');
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }
}
