class MovieSection extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <ul class="item-list" id="skeleton-list">
          ${/* html */ `<skeleton-list-item></skeleton-list-item>`.repeat(20)}
        </ul>
        <button id="load-more" class="btn primary full-width">더 보기</button>
      </section>
    `;
  }

  connectedCallback() {
    this.querySelector('#load-more').addEventListener('click', this.onClickLoadMore);
  }

  onClickLoadMore = () => {
    this.dispatchEvent(new CustomEvent('loadMore', { bubbles: true }));
  };
}

export default MovieSection;
