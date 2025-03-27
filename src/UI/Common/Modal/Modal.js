import "./Modal.css";
import { getMovieDetail } from "../../../Domain/getMovieDetail";
import Rate from "../../Rate/Rate";

class Modal {
  #movie;
  #isLoading;
  #show;

  constructor($target, movieId) {
    this.$target = $target;
    this.movieId = movieId;

    this.#movie;
    this.#show = false;
    this.#isLoading = false;

    this.$div;
  }

  async init() {
    if (this.movieId) {
      const movieDetail = await this.getMovieDetailData();
      this.setMovie(movieDetail);
    }
  }

  setIsLoading(isLoading) {
    this.#isLoading = isLoading;
    this.render();
  }

  setShow(show) {
    this.#show = show;
    this.render();
  }

  setMovie(newMovie) {
    this.#movie = newMovie;
    this.render();
  }

  async getMovieDetailData() {
    this.setIsLoading(true);
    this.setShow(true);

    const data = await getMovieDetail(this.movieId);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data !== null) {
      this.setIsLoading(false);

      return data;
    }
  }

  render() {
    this.$div = document.createElement("div");

    this.$div.classList.add("modal-background");
    this.$div.id = "modalBackground";

    if (this.#show) this.$div.classList.add("active");

    if (this.#isLoading) {
      this.$div.innerHTML = `
            <div>로딩중...</div>
        `;
      this.$target.appendChild(this.$div);
      return;
    }

    if (!this.#isLoading) {
      const $el = document.querySelector(".modal-background");
      $el.remove();
    }

    if (!this.#movie) return;

    const { title, poster_path, vote_average, genres, release_date, overview } =
      this.#movie;

    const $modal = document.createElement("div");
    $modal.classList.add("modal");

    const $closeButton = document.createElement("button");
    $closeButton.classList.add("close-modal");
    $closeButton.id = "closeModal";
    $closeButton.innerHTML = /*html*/ `
        <img src="./images/modal_button_close.png" />
    `;

    $closeButton.addEventListener("click", this.handleCloseButtonClick);

    const $modalContainer = document.createElement("div");
    $modalContainer.classList.add("modal-container");
    $modalContainer.innerHTML = /*html*/ `
        <div class="modal-image">
          <img
            src=${`https://image.tmdb.org/t/p/w300${poster_path}`}
          />
        </div>

    `;

    const $modalDescription = document.createElement("div");
    $modalDescription.classList.add("modal-description");
    $modalDescription.innerHTML = /*html*/ `
        <h2>${title}</h2>
        <p class="category">
        ${release_date.substr(0, 4)} · ${genres
      .map((genre) => genre.name)
      .join(", ")}
        </p>
        <div class="average-container">
            <span class="average-info-text">평균</span>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" />
              <span>${vote_average.toFixed(1)}</span>
            </p>
        </div>
        <hr />
        <p class="info-text">내 별점</p>
        <div class="rate-container"></div>
    `;

    $modalContainer.appendChild($modalDescription);
    new Rate($modalDescription.querySelector(".rate-container")).render();
    const $hr = document.createElement("hr");
    const $overviewText = document.createElement("p");
    $overviewText.classList.add("info-text");
    $overviewText.textContent = "줄거리";

    const $detail = document.createElement("p");
    $detail.classList.add("detail");
    $detail.textContent = overview;

    $modalDescription.append($hr, $overviewText, $detail);

    $modal.appendChild($closeButton);
    $modal.appendChild($modalContainer);
    this.$div.appendChild($modal);

    this.$target.appendChild(this.$div);
  }

  handleCloseButtonClick = () => {
    this.$div.classList.remove("active");
  };
}

export default Modal;

// $modalContainer.innerHTML = /*html*/ `
// <div class="modal-image">
//   <img
//     src=${`https://image.tmdb.org/t/p/w300${poster_path}`}
//   />
// </div>
// <div class="modal-description">
//   <h2>${title}</h2>
//   <p class="category">
//   ${release_date.substr(0, 4)} · ${genres
// .map((genre) => genre.name)
// .join(", ")}
//   </p>
//   <p class="rate">
//     <img src="./images/star_filled.png" class="star" />
//     <span>${vote_average.toFixed(1)}</span>
//   </p>
//   <hr />
//   <p class="overview-text">내 별점</p>
//   <div class="rating-selector">
//     ${Array.from({ length: 5 }, (v, i) => (i + 1) * 2)
//       .map(
//         (el) =>
//           `<button class="rate-button">
//           <img src="./images/star_filled.png" class="star" />
//         </button>`
//       )
//       .join("")}
//       <span class="rate-text">${this.getRateText(this.#rate)}</span>
//       <span class="rate-number">(${this.#rate}/10)</span>
//   </div>
//   <hr />
//   <p class="overview-text">줄거리</p>
//   <p class="detail">
//     ${overview}
//   </p>
// </div>
// `;
