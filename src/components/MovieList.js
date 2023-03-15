import MovieCard from './MovieCard';

export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
  }

  template() {
    return `
      <main>
        <section class="item-view">
          <h2>${'추후수정' ? '지금 인기 있는 영화' : `"${text}" 검색 결과`}</h2>
          <ul class="item-list"></ul>
        </section>
        <button class="btn primary full-width">더 보기</button>
      </main>
    `;
  }

  init() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
    this.$title = this.$parent.querySelector('h2');
    this.$movieItemList = this.$parent.querySelector('ul');

    return this;
  }

  renderTitle(title) {
    this.$title.textContents = title;
  }

  renderMovieCards(results) {
    results.forEach((movie) => {
      new MovieCard(this.$movieItemList, movie).render();
    });
  }

  removeMovieCards() {
    this.$movieItemList.innerHTML = '';
  }
}
