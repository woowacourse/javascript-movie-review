import Store from '../Store';

import { movieItem, WholeScreenMessageAlert } from './';

class ItemList {
  $ul = document.createElement('ul');

  constructor($target) {
    this.$ul.className = 'item-list';

    this.render($target);
  }

  render($target) {
    const { nonexistent, template } = this.template();

    if (nonexistent) {
      this.$ul.innerHTML = '';
      this.$ul.insertAdjacentHTML('beforebegin', template);

      return;
    }

    const $alertMessage = $target.querySelector('.alert-message');
    if ($alertMessage) $target.removeChild($alertMessage);

    this.$ul.innerHTML = template;
    $target.insertAdjacentElement('beforeend', this.$ul);
  }

  template() {
    const { movies } = Store.getState();

    if (!movies.length) {
      return {
        nonexistent: true,
        template: WholeScreenMessageAlert('영화 목록이 없습니다.'),
      };
    }

    return {
      nonexistent: false,
      template: movies.reduce((item, movie) => (item += movieItem(movie)), ``),
    };
  }
}

export default ItemList;
