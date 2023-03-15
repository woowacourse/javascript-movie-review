import { Store } from '..';
import { getPopularMovies, searchMovies } from '../service/movie';
import MovieCard from './MovieCard';

export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
    this.renderMode = 'popular';
    this.page = 1;
  }

  template() {
    return `
      <main>
        <section class="item-view">
          <h2 id="js-movie-list-title">${
            '추후수정' ? '지금 인기 있는 영화' : `"${text}" 검색 결과`
          }</h2>
          <ul id="js-movie-list" class="item-list"></ul>
        </section>
        <button id="js-more-movie-button" class="btn primary full-width">더 보기</button>
      </main>
    `;
  }

  init() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
    this.$title = this.$parent.querySelector('#js-movie-list-title');
    this.$movieItemList = this.$parent.querySelector('#js-movie-list');

    return this;
  }

  bindEvent() {
    const moreMovieButton = this.$parent.querySelector('#js-more-movie-button');

    const handleMoreMovieButton = async () => {
      this.page += 1;

      if (this.renderMode === 'popular') {
        const { results } = await getPopularMovies({ page: this.page });
        this.renderMovieCards(results);
      }

      if (this.renderMode === 'search') {
        const { results } = await searchMovies({ page: this.page, text: Store.keyword });
        this.renderMovieCards(results);
      }
    };

    moreMovieButton?.addEventListener('click', handleMoreMovieButton);
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
