import Movie from './Movie';

export default class MovieList {
  $element;

  constructor($parent) {
    this.$element = document.createElement('section');
    this.$element.className = 'item-view';

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();

    new Movie(this.$element.querySelector('.item-list')).render();
  }

  template() {
    return `       
    <h2>지금 인기 있는 영화</h2>
    <ul class="item-list"></ul>  
    <button class="btn primary full-width">더 보기</button>`;
  }
}
