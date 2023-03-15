import { dispatchCustomEvent } from '../utils/domUtils';

class MovieListSection extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <ul class="item-list" id="skeleton-list"></ul>
        <button id="load-more" class="btn primary full-width">더 보기</button>
      </section>
    `;
  }

  connectedCallback() {
    this.querySelector('#load-more').addEventListener('click', () =>
      dispatchCustomEvent(this, 'loadMore')
    );
  }
}

export default MovieListSection;
