import movieItem from './movieItem';
import Store from '../Store';

class ItemList {
  $ul = document.createElement('ul');

  constructor($target) {
    this.$ul.className = 'item-list';

    this.render($target);
  }

  template() {
    // 영화 데이터 정보 배열로 있다.
    // const infos = await Store.movie.getPopularMovies();

    // const movies = infos.results;
    const movies = Store.movies['results'];

    return movies.reduce((item, movie) => {
      return (item += movieItem(movie));
    }, ``);
  }

  async render($target) {
    this.$ul.innerHTML = await this.template();
    $target.insertAdjacentElement('beforeend', this.$ul);
  }
}

export default ItemList;
