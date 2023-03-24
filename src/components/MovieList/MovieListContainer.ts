import Component from '../core/Component';

// components
import MovieItem from '../MovieItem';
import MoviePopularList from './MoviePopularList';
import MovieSearchList from './MovieSearchList';
import MovieDetail from './MovieDetail';

// utils
import { scrollHook } from '../../utils/infiniteScroll';
import { cache } from '../../utils/cache';

type MovieListProps = {
  $target: HTMLElement;
  components: {
    popular: MoviePopularList;
    search: MovieSearchList;
    detail: MovieDetail;
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

    return this;
  }

  template() {
    return this.state
      .getValue('movies')
      .map((movie) => new MovieItem().template(movie))
      .join('');
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());

    this.setInfinityScrollEvent();
  }

  setInfinityScrollEvent() {
    if (
      cache.popularPage.has(this.state.getValue('popularPage')) ||
      cache.searchPage.has(this.state.getValue('searchPage'))
    )
      return;

    if (!(this.$target.lastElementChild instanceof Element)) return;

    scrollHook(() => this.fetchData()).observe(this.$target.lastElementChild);
  }

  addEvent(eventTarget: Element) {
    const targetId = Number(eventTarget.closest('li')?.id);

    this.components.detail.emit(`movie/${targetId}`);
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target instanceof HTMLElement && e.target.closest('li')) {
        this.addEvent(e.target);
      }
    });

    return this;
  }
}
