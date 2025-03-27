import { STAR_COMMENT } from "../../constants/constants";

class Modal {
  constructor(movieDetail) {
    this.movieDetail = movieDetail;
  }
  render() {
    this.$div = document.createElement("div");
    this.$div.innerHTML =
      /*html*/
      `
        <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original/${
                this.movieDetail.poster_path
              }"
            />
          </div>
          <div class="modal-description">
            <h2>${this.movieDetail.title}</h2>
            <p class="category">
              ${
                this.movieDetail.release_date.split("-")[0]
              } · ${this.movieDetail.genres.map((data) => data.name)}
            </p>
            <div class="average_star_container">
            <p class=>평균 </p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                >${parseFloat(this.movieDetail.vote_average).toFixed(1)}</span
              >
            </p>
            </div>
            <hr />
            <p class="middle_font">내 별점</p>
            <div class="my_star_container">
              <p class="rate" id="myStars">
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              <img src="./images/star_empty.png" class="star" />
              </p>
              <p class="middle_font" id="comment"> 명작이에요</p>
              <p class="star_count"></p>
            </div>
            <hr/>
            <p class="middle_font">줄거리</p>
            <p class="detail">
              ${this.movieDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
        `;

    this.addCloseModal();
    this.addHandleStar();
    this.loadRating();
    return this.$div;
  }

  loadRating() {
    const savedRating = localStorage.getItem(this.movieDetail.id);

    if (savedRating) {
      const { rating } = JSON.parse(savedRating);
      const starImages = this.$div.querySelectorAll("#myStars img");
      const comment = this.$div.querySelector("#comment");
      const count = this.$div.querySelector(".star_count");

      starImages.forEach((star, index) => {
        star.src =
          index < rating / 2
            ? "./images/star_filled.png"
            : "./images/star_empty.png";
      });
      comment.innerHTML = `${STAR_COMMENT[rating]}`;
      count.innerHTML = `(${rating}/10)`;
    }
  }

  addHandleStar() {
    const starImages = this.$div.querySelectorAll("#myStars img");
    const comment = this.$div.querySelector("#comment");
    const count = this.$div.querySelector(".star_count");
    starImages.forEach((star, index) => {
      star.addEventListener("click", () => {
        const score = (index + 1) * 2;

        starImages.forEach((s, i) => {
          s.src =
            i < index + 1
              ? "./images/star_filled.png"
              : "./images/star_empty.png";
        });
        const ratingData = {
          id: this.movieDetail.id,
          rating: score,
        };
        localStorage.setItem(this.movieDetail.id, JSON.stringify(ratingData));
        comment.innerHTML = `${STAR_COMMENT[score]}`;
        count.innerHTML = `(${score}/10)`;
      });
    });
  }

  addCloseModal() {
    const closeButton = this.$div.querySelector("#closeModal");
    closeButton.addEventListener("click", () => this.closeModal());
    document.addEventListener("keydown", () => this.handleKeyDown(event));
  }
  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.closeModal();
    }
  }

  closeModal() {
    this.$div.remove();
  }
}
export default Modal;
