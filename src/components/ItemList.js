import movieItem from './movieItem';

class ItemList {
  $ul = document.createElement('ul');

  constructor($target) {
    this.$ul.className = 'item-list';

    this.render($target);
  }

  template() {
    // 영화 데이터 정보 배열로 있다.
    const movies = [];
    return movies.reduce((item, movie) => {
      return (item += movieItem(movie));
    }, ``);
  }

  render($target) {
    this.$ul.innerHTML = this.template();
    $target.insertAdjacentElement('beforeend', this.$ul);
  }
}

export default ItemList;
