import Component from './core/Component';

export default class SeeMore extends Component {
  $target;

  state;

  constructor($target: HTMLElement) {
    super();
    this.$target = $target;

    this.state = this.useState();
  }

  showMoreMovies(renderMovieList: () => void) {
    renderMovieList();
  }

  showButton() {
    if (this.state.getValue('isEnd')) {
      this.$target.classList.add('button--hidden');
      return;
    }

    this.$target.classList.remove('button--hidden');
  }

  template() {
    return '더보기';
  }

  render() {
    this.showButton();

    this.$target.innerHTML = this.template();
  }

  setEvent(renderMovieList: () => void) {
    this.$target.addEventListener('click', () => {
      if (this.$target instanceof HTMLButtonElement) {
        this.showMoreMovies(renderMovieList);
      }
    });
  }
}
