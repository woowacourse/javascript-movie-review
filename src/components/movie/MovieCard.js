export default class MovieCard {
  constructor(movie) {
    this.movie = movie;
  }

  render() {
    const li = document.createElement('li');

    li.innerHTML = /*html*/ `
      <div class="item">
        <img
          class="thumbnail"
          src="${this.movie.getPosterUrl()}"
          alt="${this.movie.title}"
          data-id="${this.movie.id}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span>${this.movie.getVoteAverage()}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;

    return li;
  }

  renderSkeleton() {
    const li = document.createElement('li');
    li.classList.add('skeleton-card');

    li.innerHTML = `
      <div class="item">
        <div class="skeleton skeleton-thumbnail"></div>
        <div class="item-desc">
          <p class="rate">
            <div class="skeleton skeleton-star"></div>
            <div class="skeleton skeleton-rate"></div>
          </p>
          <div class="skeleton skeleton-title"></div>
        </div>
      </div>
    `;

    return li;
  }
}
