export default class Movie {
  constructor({ id, title, posterPath, voteAverage }) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
    this.voteAverage = voteAverage;
  }

  render() {
    console.log("Rendering movie:", this.title, this.posterPath, this.voteAverage);
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item">
        <img
          class="thumbnail"
          src="https://media.themoviedb.org/t/p/w440_and_h660_face${this.posterPath}"
          alt="${this.title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span>${this.voteAverage}</span>
          </p>
          <strong>${this.title}</strong>
        </div>
      </div>
    `;

    return li;
  }
}
