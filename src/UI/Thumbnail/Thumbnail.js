import "./Thumbnail.css";

class Thumbnail {
  constructor(movie) {
    this.movie = movie;
  }
  render() {
    const $header = document.createElement("header");

    $header.innerHTML = /*html*/ `
      <div class="background-container">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="rate">
              <img src="${this.movie.src}" class="star" />
              <span class="rate-value">${this.movie.rate}</span>
            </div>
            <div class="title">${this.movie.title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;
    return $header;
  }

  setEvent() {}
}
export default Thumbnail;
