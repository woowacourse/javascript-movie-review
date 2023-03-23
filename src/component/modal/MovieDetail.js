import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";
import "./MovieStar";

class MovieDetail extends CustomElement {
  template() {
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("voteAverage");
    const detail = this.getAttribute("detail");
    const genre_ids = this.getAttribute("genre_ids");

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
          <p>${genre_ids}</p>
          <img class="detail-star" src="./image/star_filled.png" alt="별점" />
          <p>${voteAverage}</p>
        </div>
        <div class="detail text-body">${detail}</div>
        <movie-star id=${id}></movie-star>
      </section>
    </section>
    `;
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
