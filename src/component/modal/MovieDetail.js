import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";
import "./MovieStar";

class MovieDetail extends CustomElement {
  template() {
    const id = this.getAttribute("id");
    const starSrc = this.toStarSrc();
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("voteAverage");
    const detail = this.getAttribute("detail");
    const genres = this.getAttribute("genres");

    return `
    <section class="modal-head">
      <span></span>
      <h3 class="text-title">${title}</h1>
      <div class="close-btn text-title">X</div>
    </section>
    <hr />
    <section class="modal-main">
      <img class="modal-img skeleton" src=${src} />
      <section class="modal-detail">
        <div class="title text-body">
          <p>${genres}</p>
          <img class="detail-star" src="./image/star_filled.png" alt="별점" />
          <p>${voteAverage}</p>
        </div>
        <div class="detail text-body">${detail}</div>
        <movie-star id=${id} starSrc=${starSrc}></movie-star>
      </section>
    </section>
    `;
  }

  toStarSrc() {
    const fill = parseInt(localStorage.getItem(this.getAttribute("id")));

    const starSrc = Array.from({ length: 5 }, (v, i) => {
      if (i < fill) return "./image/star_filled.png";
      return "./image/star_empty.png";
    });

    return starSrc;
  }

  setEvent() {
    $(".close-btn").addEventListener("click", this.hideModal);

    window.addEventListener("keyup", (e) => {
      if ($(".modal-open").classList.contains("modal")) return;
      if (e.key === "Escape") {
        this.hideModal();
      }
    });
  }

  hideModal() {
    $(".modal-open").classList.add("modal");
    $(".modal-open").closest("body").classList.remove("scroll");
  }
}

customElements.define("movie-detail", MovieDetail);

export default MovieDetail;
