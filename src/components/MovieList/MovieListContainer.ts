import { subscribeStateInfo } from './../atoms/Observer';
import Component from '../core/Component';

// components
import MovieItem from '../MovieItem';
import MoviePopularList from './MoviePopularList';
import MovieSearchList from './MovieSearchList';

// utils
import { scrollHook } from '../../utils/infiniteScroll';
import { cache } from '../../utils/cache';

type MovieListProps = {
  $target: HTMLElement;
  components: {
    popular: MoviePopularList;
    search: MovieSearchList;
  };
};

export default class MovieListContainer extends Component {
  $target;

  components;

  constructor({ $target, components }: MovieListProps) {
    super();

    this.$target = $target;
    this.components = components;
  }

  fetchData() {
    this.components.popular.emit();
    this.components.search.emit(this.state.getValue('query'));
  }

  template() {
    return this.state
      .getValue('movies')
      .map((movie) => new MovieItem().template(movie))
      .join('');
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());

    this.setEvent();
  }

  setEvent() {
    if (
      cache.popularPage.has(this.state.getValue('popularPage')) ||
      cache.searchPage.has(this.state.getValue('searchPage'))
    )
      return;

    if (!(this.$target.lastElementChild instanceof Element)) return;

    scrollHook(() => this.fetchData()).observe(this.$target.lastElementChild);
  }
}
