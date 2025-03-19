export default class MovieCard {
  constructor(movie) {
    this.movie = movie;
  }

  render() {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item">
        <img
          class="thumbnail"
          src="${this.movie.getPosterUrl()}"
          alt="${this.movie.title}"
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
}
