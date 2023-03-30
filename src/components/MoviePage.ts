import createObserver from '../utils/createObserver';
import { dispatchCustomEvent } from '../utils/domUtils';

class MoviePage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const title = this.getAttribute('title');
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">${title}</h2>
        <ul class="item-list"></ul>
        <ul class="item-list" id="skeleton-list">
          ${/* html */ `<skeleton-list-item></skeleton-list-item>`.repeat(16)}
        </ul>
        <div id="load-sensor"></div>
      </section>
    `;
  }

  connectedCallback() {
    const $loadSensor = this.querySelector('#load-sensor');
    if ($loadSensor) {
      createObserver(() => dispatchCustomEvent(this, 'loadMore')).observe($loadSensor);
    }
  }
}

export default MoviePage;
