import { Store } from '..';
import { RENDER_MODE } from '../constants';
import { getPopularMovies, searchMovies } from '../service/movie';
import MovieCard from './MovieCard';

export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
    this.renderMode = RENDER_MODE.POPULAR;

    this.render();
    this.selectDom();
  }

  template() {
    return `
      <main>
        <section class="item-view">
          <h2 id="js-movie-list-title">지금 인기 있는 영화</h2>
          <ul id="js-movie-list" class="item-list"></ul>
        </section>
      </main>
    `;
  }

  skeletonTemplate() {
    return `
      <li class='skeleton-li'>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
    `;
  }

  bindEvent() {
    const handleMoreMovieButton = async () => {
      Store.page += 1;

      if (this.renderMode === RENDER_MODE.POPULAR) {
        this.toggleSkeleton();
        const { results, total_pages } = await getPopularMovies({ page: Store.page });
        this.toggleSkeleton();
        this.renderMovieCards(results, total_pages);
      }

      if (this.renderMode === RENDER_MODE.SEARCH) {
        this.toggleSkeleton();
        const { results, total_pages } = await searchMovies({
          page: Store.page,
          text: Store.keyword,
        });
        this.toggleSkeleton();
        this.renderMovieCards(results, total_pages);
      }
    };

    this.$moreMovieButton?.addEventListener('click', handleMoreMovieButton);
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }

  selectDom() {
    this.$title = this.$parent.querySelector('#js-movie-list-title');
    this.$movieItemList = this.$parent.querySelector('#js-movie-list');
    this.$moreMovieButton = this.$parent.querySelector('#js-more-movie-button');
    this.$lastPageNotify = this.$parent.querySelector('#js-last-page-notify');
    this.$skeletonDiv = this.$parent.querySelector('#js-movie-list-skeleton');
  }

  renderTitle(title) {
    this.$title.textContent = title;
  }

  renderMovieCards(results, totalPages) {
    const MovieCardshtml = results.reduce((html, movie) => {
      return html + new MovieCard().template(movie);
    }, '');

    this.$movieItemList.insertAdjacentHTML('beforeend', MovieCardshtml);
  }

  removeMovieCards() {
    this.$movieItemList.innerHTML = '';
  }

  toggleSkeleton() {
    const $skeletonLists = this.$movieItemList.querySelectorAll('.skeleton-li');

    if ($skeletonLists.length > 0) {
      $skeletonLists.forEach(($skeletonList) => $skeletonList.remove());
    } else {
      this.$movieItemList.insertAdjacentHTML('beforeend', this.skeletonTemplate().repeat(20));
    }
  }
}
