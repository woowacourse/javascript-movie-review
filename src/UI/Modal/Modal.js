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
              <p class="rate">
                <img src="./images/star_empty.png" class="star1" />
                <img src="./images/star_empty.png" class="star2" />
                <img src="./images/star_empty.png" class="star3" />
                <img src="./images/star_empty.png" class="star4" />
                <img src="./images/star_empty.png" class="star5" />
              </p>
              <p class="middle_font"> 명작이에요</p>
              <p class="star_count">(8/10)</p>
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

    const closeButton = this.$div.querySelector("#closeModal");
    closeButton.addEventListener("click", () => this.closeModal());
    document.addEventListener("keydown", () => this.handleKeyDown(event));

    return this.$div;
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
