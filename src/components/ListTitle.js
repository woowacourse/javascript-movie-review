import Store from '../Store';
class ListTitle {
  $h2 = document.createElement('h2');

  constructor($target) {
    this.init($target);
  }

  init($target) {
    $target.insertAdjacentElement('beforeend', this.$h2);
    this.render(this.$h2);
  }

  render($target) {
    const { query, category } = Store.movies;
    $target.innerHTML = category === 'popular' ? '지금 인기있는 영화' : `"${query}" 검색 결과`;
  }
}

export default ListTitle;
