class MovieListTitle {
  $movieListTitle = document.createElement('h2');

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$movieListTitle.innerText = '지금 인기 있는 영화';
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$movieListTitle);
  }

  changeInnerText(listTitle) {
    this.$movieListTitle.innerText = listTitle;
  }
}

export default MovieListTitle;
