import Component from './core/Component';
import MovieListContainer from './MovieList/MovieListContainer';

type SeeMoreProps = {
  $target: HTMLElement;
  components: {
    movieList: MovieListContainer;
  };
};

export default class SeeMore extends Component {
  $target;

  components;

  constructor({ $target, components }: SeeMoreProps) {
    super();

    this.$target = $target;
    this.components = components;
  }

  showButton() {
    if (this.state.getValue('isEnd')) {
      this.$target.classList.add('hide');
      return;
    }

    this.$target.classList.remove('hide');
  }

  template() {
    return '더보기';
  }

  render() {
    this.showButton();

    this.$target.innerHTML = this.template();

    return this;
  }

  setEvent() {
    this.$target.addEventListener('click', () => {
      if (this.$target instanceof HTMLButtonElement) {
        this.components.movieList.fetchData();
      }
    });
  }
}
