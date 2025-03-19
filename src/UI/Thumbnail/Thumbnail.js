import "./Thumbnail.css";

class Thumbnail {
  constructor(movie) {
    this.movie = movie;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("background-container");
    $div.style.backgroundImage = `url("${this.movie.poster_path}")`;

    console.log(this.movie);
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

  setEvent() {}
}
export default Thumbnail;
