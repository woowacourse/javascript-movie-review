import { CUSTOM_EVENT } from '../constants';

class MovieListTitle {
  $movieListTitle = document.createElement('h2');

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$movieListTitle.innerText = '지금 인기 있는 영화';
  }

  render($target) {
    $target.insertAdjacentElement('afterbegin', this.$movieListTitle);
  }

  bindEvent() {
    document.addEventListener(CUSTOM_EVENT.UPDATE_MOVIE_LIST_TITLE, ({ detail: { query } }) => {
      if (query) {
        return this.changeInnerText(`"${query}" 검색 결과`);
      }

      this.changeInnerText('지금 인기 있는 영화');
    });
  }

  changeInnerText(listTitle) {
    this.$movieListTitle.innerText = listTitle;
  }
}

export default MovieListTitle;
