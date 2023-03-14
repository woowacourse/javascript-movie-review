customElements.define(
  "movie-list-container",
  class MovieListContainer extends HTMLElement {
    constructor() {
      super();
    }

    render() {
      this.innerHTML = /* html */ `
          <h2>지금 인기 있는 영화</h2>
          <button class="btn primary full-width">더 보기</button>
        `;
    }
  }
);
