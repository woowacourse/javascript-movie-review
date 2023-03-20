import { MAX_MOVIES_PER_PAGE } from '../constants';

import { $, dispatchCustomEvent } from '../utils/domUtils';

class MovieListSection extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <ul class="item-list" id="skeleton-list">
        ${
          /* html */ `
        <li>
          <a href="#">
            <div class="item-card">
              <div class="item-thumbnail skeleton"></div>
              <div class="item-title skeleton"></div>
              <div class="item-score skeleton"></div>
            </div>
          </a>
        </li>
        `.repeat(MAX_MOVIES_PER_PAGE)
        }
        </ul>
        <button id="load-more" class="btn primary full-width">더 보기</button>
      </section>
    `;
  }

  connectedCallback() {
    $('#load-more')?.addEventListener('click', () => dispatchCustomEvent(this, 'loadMore'));
  }
}

export default MovieListSection;
