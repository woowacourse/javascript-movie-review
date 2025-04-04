import "./Thumbnail.css";

class Thumbnail {
  constructor(movie, $target, setMovieId) {
    this.movie = movie;
    this.$target = $target;
    this.setMovieId = setMovieId;
  }

  render() {
    const $div = document.createElement("div");
    $div.classList.add("background-container");

    if (!this.movie) {
      $div.classList.add("thumbnail-skeleton-box");

      $div.innerHTML = /*html*/ `
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="empty-rate">
              <span class="rate-empty-value"> </span>
            </div>
            <div class="empty-title"> </div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;

      this.$target.appendChild($div);
      return;
    }

    $div.style.backgroundImage = `url("${this.movie.backdrop_path}")`;

    const $overlay = document.createElement("div");
    $overlay.classList.add("overlay");
    $overlay.setAttribute("aria-hidden", true);

    const $topRatedContainer = document.createElement("div");
    $topRatedContainer.classList.add("top-rated-container");

    const $topRatedMovie = document.createElement("div");
    $topRatedMovie.classList.add("top-rated-movie");
    $topRatedMovie.innerHTML = /*html*/ `
      <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class="rate-value">${this.movie.vote_average}</span>
      </div>
      <div class="title">${this.movie.title}</div>
    `;

    const $button = document.createElement("button");
    $button.className = "primary detail";
    $button.textContent = "자세히 보기";

    $button.addEventListener("click", this.handleButtonClick);

    $div.appendChild($overlay);
    $div.appendChild($topRatedContainer);
    $topRatedContainer.appendChild($topRatedMovie);
    $topRatedMovie.appendChild($button);

    this.$target.appendChild($div);
  }

  handleButtonClick = () => {
    this.setMovieId(this.movie.id);
  };
}
export default Thumbnail;
