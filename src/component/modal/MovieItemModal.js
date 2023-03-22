import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItemModal extends CustomElement {
  template() {
    const { title, starRate, src, id, genres, description } = {
      title: "title",
      starRate: 3.4,
      src: "https://image.tmdb.org/t/p/w220_and_h330_face/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
      id: 2313,
      genres: ["Animation", "Adventure", "Comedy", "Family"],
      description:
        "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
    };
    return `
    <div class="item-modal-container" id=${id}>
      <div class="backdrop"></div>
      <div class="item-modal-header">
        <div class='item-modal-title'>${title}</div>
        <button class="item-modal-close-button button" type="button">X</button>
      </div>
      <div class="item-modal-content">
        <img class="item-modal-thumbnail" src=${src} alt=${title} />
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

  popUp(movieInfo) {
    this.insertAdjacentHTML("beforeend", this.template(movieInfo));
    $("body").insertAdjacentHTML("beforeend", this);
  }
}

customElements.define("movie-item-modal", MovieItemModal);

export default MovieItemModal;
