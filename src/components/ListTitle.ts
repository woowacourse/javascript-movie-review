import EventBroker from '../EventBroker';
import stateRender from '../renderer/StateRender';

class ListTitle {
  private $h2 = document.createElement('h2');

  constructor() {
    this.$h2.className = 'movie-list-title';
  }

  render($target: HTMLElement) {
    const { category, query } = stateRender.getMovieState();

    this.$h2.innerText = category === 'search' ? `"${query}" 검색 결과` : '지금 인기있는 영화';

    $target.insertAdjacentElement('beforeend', this.$h2);
  }
}

export default ListTitle;
