import movieItem from './movieItem';
import { Store } from '../Store';

class ItemList {
  $ul = document.createElement('ul');

  constructor($target: HTMLElement) {
    this.$ul.className = 'item-list';

    this.render($target);
  }

  template() {
    const movies = Store.movieStates?.getMovieStates();

    if (!movies?.results.length)
      return {
        isProblem: true,
        template: ItemListErrorTemplate(
          `입력하신 "${movies?.query}"(와)과 일치하는 결과가 없습니다.`
        ),
      };

    return {
      isProblem: false,
      template: movies?.results.reduce((item, movie) => (item += movieItem(movie)), ``),
    };
  }

  render($target: HTMLElement) {
    const { isProblem, template } = this.template();

    if (isProblem) {
      this.$ul.innerHTML = '';
      this.$ul.insertAdjacentHTML('beforebegin', template);
      return;
    }

    const $alertContainer = $target.querySelector('.alert-container');
    if ($alertContainer) $target.removeChild($alertContainer);

    this.$ul.innerHTML = template;
    $target.insertAdjacentElement('beforeend', this.$ul);
  }
}

function ItemListErrorTemplate(message: string) {
  return `
  <div class="alert-container">
    <p class="alert-message alert-title">${message}</p>
      
    <p class="alert-message alert-sub-title">🌕 다른 키워드를 입력해 보세요.</p>
    <p class="alert-message alert-sub-title">🌕 영화를 찾고 계신가요?</p>
    <p class="alert-message alert-sub-title">🌕 영화 제목만을 입력해 주세요</p>
    
  </div>
  `;
}

export default ItemList;
