import "./Thumbnail.css";

class Thumbnail {
  constructor(movie, isLoading) {
    this.movie = movie;
    this.isLoading = isLoading;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("background-container");
    if (this.isLoading || !this.movie) {
      $div.classList.add("skeleton-thumbnail");
      return $div;
    }

    $div.style.backgroundImage = `url("${this.movie.backdrop_path}")`;

    $div.innerHTML = /*html*/ `
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${this.movie.vote_average}</span>
            </div>
            <div class="title">${this.movie.title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;

    return $div;
  }
}
export default Thumbnail;
