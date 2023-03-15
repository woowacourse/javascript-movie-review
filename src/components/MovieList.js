export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
  }

  template(movie) {
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

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
