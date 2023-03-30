import { Store } from '..';
import { RENDER_MODE } from '../constants';
import { getPopularMovies, searchMovies, getMovieById } from '../service/movie';
import MovieCard from './MovieCard';
import MovieInfo from './MovieInfo';

export default class MovieList {
  constructor($parent) {
    this.$parent = $parent;
    this.renderMode = RENDER_MODE.POPULAR;
    this.io = new IntersectionObserver(this.handleIntersect.bind(this));
    this.FETCH_FUNCTION = {
      [RENDER_MODE.POPULAR]: getPopularMovies,
      [RENDER_MODE.SEARCH]: searchMovies,
    };
    this.getFetchOptions = {
      [RENDER_MODE.POPULAR]: () => ({ page: Store.page }),
      [RENDER_MODE.SEARCH]: () => ({ page: Store.page, text: Store.keyword }),
    };
    this.isLoading = false;

    this.render();
    this.selectDom();
    this.mount().then(() => {
      this.io.observe(this.$detectingScroll);
    });
  }

  handleIntersect(entries, io) {
    const isLastPage = Store.page === Store.lastPage;

    entries.forEach((entry) => {
      if (!this.isLoading && entry.isIntersecting && !isLastPage) {
        this.renderNewContent();
      }
    });
  }

  template() {
    return `
      <main>
        <section class="item-view">
          <h2 id="js-movie-list-title">지금 인기 있는 영화</h2>
          <ul id="js-movie-list" class="item-list"></ul>
          <div id="js-detecting-scroll" class="detecting-scroll"></div>
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

  loadingTemplate() {
    return `
      <span class="loader"></span>
    `;
  }

  bindEvent(insertModalContent) {
    this.$movieItemList.addEventListener('click', async (event) => {
      const movieCard = event.target.closest('.item-card');
      if (!movieCard) return;

      const id = movieCard.getAttribute('data-id');
      const movie = await getMovieById(id);

      const movieInfo = new MovieInfo();
      insertModalContent(movieInfo.template(movie));
      movieInfo.bindEvent();
    });
  }

  async renderNewContent() {
    Store.page += 1;

    this.startLoading();

    const fetchMovies = this.FETCH_FUNCTION[this.renderMode];
    const { results, total_pages } = await fetchMovies(this.getFetchOptions[this.renderMode]());

    Store.lastPage = total_pages;

    this.finishLoading();
    this.renderMovieCards(results);
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }

  selectDom() {
    this.$title = this.$parent.querySelector('#js-movie-list-title');
    this.$movieItemList = this.$parent.querySelector('#js-movie-list');
    this.$detectingScroll = this.$parent.querySelector('#js-detecting-scroll');
  }

  renderTitle(title) {
    this.$title.textContent = title;
  }

  renderMovieCards(results) {
    const MovieCardshtml = results.reduce((html, movie) => {
      return html + new MovieCard().template(movie);
    }, '');

    this.$movieItemList.insertAdjacentHTML('beforeend', MovieCardshtml);
  }

  removeMovieCards() {
    this.$movieItemList.innerHTML = '';
  }

  startLoading() {
    this.isLoading = true;
    this.$movieItemList.insertAdjacentHTML('beforeend', this.skeletonTemplate().repeat(10));
    this.$detectingScroll.insertAdjacentHTML('beforeend', this.loadingTemplate());
  }

  finishLoading() {
    this.isLoading = false;
    this.$detectingScroll.innerHTML = '';

    const $skeletonLists = this.$movieItemList.querySelectorAll('.skeleton-li');

    if ($skeletonLists.length > 0) {
      $skeletonLists.forEach(($skeletonList) => $skeletonList.remove());
    }
  }

  async mount() {
    this.startLoading();
    const { results, total_pages } = await getPopularMovies({ page: 1 });
    this.finishLoading();
    this.renderMovieCards(results, total_pages);
  }
}
