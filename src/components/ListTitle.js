class ListTitle {
  $h2 = document.createElement('h2');
  content = '지금 인기있는 영화';

  constructor($target) {
    this.render($target);
    this.$target = $target;
  }

  render($target) {
    this.$h2.innerHTML = this.content;
    $target.insertAdjacentElement('beforeend', this.$h2);
  }

  setContent(query) {
    // category에 따라 다름.
    this.content = `"${query}" 검색 결과`;
  }
}

export default ListTitle;
