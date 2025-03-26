class Modal {
  constructor(movieDetail) {
    this.movieDetail = movieDetail;
  }
  render() {
    const $div = document.createElement("div");
    $div.innerHTML =
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
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                >${parseFloat(this.movieDetail.vote_average).toFixed(1)}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${this.movieDetail.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
        `;
    return $div;
  }
}
export default Modal;
