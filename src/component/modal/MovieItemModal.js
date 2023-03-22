import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItemModal extends CustomElement {
  connectedCallback() {
    MovieManager.subscribeModal(this);
  }

  template(movieInfo) {
    const { title, starRate, src, id, genres, description } = movieInfo;

    const imgSrc =
      src === "null"
        ? "./image/no_image.jpg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${src}`;

    return `
    <div class="item-modal-container" id=${id}>
      <div class="backdrop"></div>
      <div class="item-modal-header">
        <div class='item-modal-title'>${title}</div>
        <button class="item-modal-close-button button" type="button">X</button>
      </div>
      <div class="item-modal-content">
        <img class="item-modal-thumbnail" src=${imgSrc} alt=${title} />
        <div class="item-modal-detail">
          <div class="item-modal-genre">${genres.join(
            " "
          )} <div><img src="./image/star_filled.png"/>${starRate}</div></div>
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
            <span class="user-rate-number">2</span>
            <span class="user-rate-caption">별로에요</span>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.close();
  }

  popUp(movieInfo) {
    this.insertAdjacentHTML("beforeend", this.template(movieInfo));
    this.setEvent();
  }

  close() {
    $(".item-modal-close-button").addEventListener("click", () => {
      this.replaceChildren();
    });
  }
}

customElements.define("movie-item-modal", MovieItemModal);

export default MovieItemModal;
