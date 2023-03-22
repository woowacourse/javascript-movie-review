import Component from '../core/Component';

// components
import MovieItem from '../MovieItem';

export default class Skeleton extends Component {
  $target;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
  }

  template() {
    return new Array(20)
      .fill(0)
      .map(() => new MovieItem().skeletonTemplate())
      .join('');
  }

  render() {
    this.setEvent();

    this.$target.insertAdjacentHTML('beforeend', this.template());
  }

  setEvent() {
    if (this.state.getValue('isLoading')) {
      this.$target.classList.remove('hide');
      return;
    }

    this.$target.classList.add('hide');
  }
}
