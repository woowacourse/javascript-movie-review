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

    if (!movies.length)
      return {
        isProblem: true,
        template: WholeScreenMessageAlert('영화 목록이 없습니다.'),
      };

    return {
      isProblem: false,
      template: movies.reduce((item, movie) => (item += movieItem(movie)), ``),
    };
  }

  render($target) {
    const { isProblem, template } = this.template();

    if (isProblem) {
      this.$ul.innerHTML = '';
      this.$ul.insertAdjacentHTML('beforebegin', template);
      return;
    }

    const $alertMessage = $target.querySelector('.alert-message');
    if ($alertMessage) $target.removeChild($alertMessage);

    this.$ul.innerHTML = template;
    $target.insertAdjacentElement('beforeend', this.$ul);
  }
}

export default ItemList;
