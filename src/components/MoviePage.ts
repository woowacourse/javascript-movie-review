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
          ${/* html */ `<skeleton-list-item></skeleton-list-item>`.repeat(20)}
        </ul>
        <button id="load-more" class="btn primary full-width">더 보기</button>
      </section>
    `;
  }

  connectedCallback() {
    this.querySelector('#load-more')?.addEventListener('click', this.onClickLoadMore);
  }

  onClickLoadMore = () => {
    this.dispatchEvent(new CustomEvent('loadMore', { bubbles: true }));
  };
}

export default MoviePage;
