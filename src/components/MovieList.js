import { getPopularMovies } from '../service/movie';
import MovieCard from './MovieCard';

export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
  }

  template(movies) {
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

  async render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());

    const { results } = await getPopularMovies({ page: 1 });
    results.forEach((movie) => {
      new MovieCard(this.$parent.querySelector('.item-list'), movie).render();
    });
  }
}
