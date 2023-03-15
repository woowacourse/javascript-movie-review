import movieItem from './movieItem';
import Store from '../Store';

class ItemList {
  $ul = document.createElement('ul');

  constructor($target) {
    this.$ul.className = 'item-list';

    this.init($target);
  }

  init($target) {
    $target.insertAdjacentElement('beforeend', this.$ul);
    this.render(this.$ul);
  }

  template() {
    const movies = Store.movies['results'];

    if (!movies.length) return `<p>영화 목록이 없습니다.</p>`;

    return movies.reduce((item, movie) => (item += movieItem(movie)), ``);
  }

  render($target) {
    $target.innerHTML = this.template();
  }
}

export default ItemList;
