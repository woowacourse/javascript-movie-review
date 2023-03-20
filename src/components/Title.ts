import Component from './core/Component';

export default class Title extends Component {
  $target;

  state;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
    this.state = this.useState();
  }

  getTitle() {
    return this.state.getValue('isSearched')
      ? `${this.state.getValue('query')} 검색 결과`
      : '가장 인기 있는 영화';
  }

  render() {
    this.$target.textContent = this.getTitle();
  }
}
