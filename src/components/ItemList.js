import movieItem from './movieItem';
import Store from '../Store';
import WholeScreenMessageAlert from './WholeScreenMessageAlert';
class ItemList {
  // 렌더링 방식 변경하기...
  $ul = document.createElement('ul');

  constructor($target) {
    this.$ul.className = 'item-list';

    this.render($target);
  }

  template() {
    const movies = Store.movies['results'];

    if (!movies.length) return WholeScreenMessageAlert('영화 목록이 없습니다.');

    return movies.reduce((item, movie) => (item += movieItem(movie)), ``);
  }

  render($target) {
    this.$ul.innerHTML = this.template();
    $target.insertAdjacentElement('beforeend', this.$ul);
  }
}

export default ItemList;
