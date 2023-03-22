import { ImgSrc, RateCaption, RATE_RANGE } from "../../constant/movieConstants";
import MovieManager from "../../domain/MovieManager";
import { $, $$ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItemModal extends CustomElement {
  connectedCallback() {
    MovieManager.subscribeModal(this);
  }

  template(movieInfo) {
    const { title, starRate, src, id, genres, description } = movieInfo;

    return `
    <dialog class="item-modal-container" id=${id}>
      
      <div class="item-modal-header">
        <div class='item-modal-title'>${title}</div>
        <button class="item-modal-close-button button" type="button">X</button>
      </div>
      <div class="item-modal-content">
        <img class="item-modal-thumbnail" src=${src} alt=${title} />
        <div class="item-modal-detail">
          <div class="item-modal-genre">${genres} <div><img src=${ImgSrc.FULL_STAR}/>${starRate}</div></div>
          <div class="item-modal-description">${description}</div>
          <div class="item-modal-user-rate">
            <span>내 별점</span>
            <div class="user-rate-stars">
              <img class="user-rate-star" src="./image/star_empty.png" data-number="1" />
              <img class="user-rate-star" src="./image/star_empty.png" data-number="2" />
              <img class="user-rate-star" src="./image/star_empty.png" data-number="3" />
              <img class="user-rate-star" src="./image/star_empty.png" data-number="4" />
              <img class="user-rate-star" src="./image/star_empty.png" data-number="5" />
            </div>
            <span class="user-rate-number"></span>
            <span class="user-rate-caption"></span>
          </div>
        </div>
      </div>
    </dialog>
    `;
  }

  setEvent() {
    this.close();
    this.rateMovie();
  }

  popUp(movieInfo) {
    this.insertAdjacentHTML("beforeend", this.template(movieInfo));
    $(".item-modal-container").showModal();
    this.setEvent();
  }

  close() {
    $(".item-modal-close-button").addEventListener("click", () => {
      this.replaceChildren();
    });
  }

  rateMovie() {
    $(".user-rate-stars").addEventListener("click", (e) => {
      const targetNumber = Number(e.target.closest("img")?.dataset.number);

      if (!targetNumber) {
        return;
      }

      const rateNumber = targetNumber * RATE_RANGE;
      const rateCaption = RateCaption[targetNumber];

      $(".user-rate-number").innerText = rateNumber;
      $(".user-rate-caption").innerText = rateCaption;
      this.rerenderStars(targetNumber);
    });
  }

  rerenderStars(targetNumber) {
    $$(".user-rate-star").forEach(($star, index) => {
      $star.src = index < targetNumber ? ImgSrc.FULL_STAR : ImgSrc.EMPTY_STAR;
    });
  }
}

customElements.define("movie-item-modal", MovieItemModal);

export default MovieItemModal;
