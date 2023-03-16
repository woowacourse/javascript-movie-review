import Store from '../Store';
class ListTitle {
  $h2 = document.createElement('h2');

  constructor($target) {
    this.$h2.className = 'movie-list-title';
    this.render($target);
  }

  render($target) {
    const { query, category } = Store.movies;

    this.$h2.innerHTML = category === 'popular' ? '지금 인기있는 영화' : `"${query}" 검색 결과`;
    $target.insertAdjacentElement('beforeend', this.$h2);
  }
}

export default ListTitle;
