import CustomComponent from "../abstracts/CustomComponent";
import StarFilledImg from "../../templates/star_filled.png";
import StarEmptyImg from "../../templates/star_empty.png";
export default class ModalComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-item"];
  }

  attributeChangedCallback() {
    const item = JSON.parse(this.getAttribute("data-item"));
    const title = this.querySelector("h3");
    const img = this.querySelector("img");
    const genre = this.querySelector(".movie-detail-header p");
    const desciption = this.querySelector(".movie-detail-description");
    const voteAverage = this.querySelector(".movie-detail-vote-average");
    const modalBody = this.querySelector(".modal-body");

    title.innerText = item.title;
    img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`;
    img.alt = `별점 ${item.vote_average}`;
    genre.innerText = item.genres.map((genre) => genre.name).join(", ");
    desciption.innerText = item.overview;
    voteAverage.innerText = item.vote_average;
    console.log(item.id);
    modalBody.setAttribute("data-movie-id", item.id);

    const rate = Number(localStorage.getItem(`movie_rate_${item.id}`));
    this.changeRate(rate);
  }

  handleEvent() {
    this.addEventListener("click", (e) => {
      switch (e.target.dataset.action) {
        case "modal-close":
          this.style.display = "none";
          document.body.style.overflow = "visible";
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "Esc") {
        this.style.display = "none";
        document.body.style.overflow = "visible";
      }
    });

    const customRateContainer = document.querySelector(".custom-rate");

    customRateContainer.addEventListener("click", (e) => {
      if (!e.target.dataset.actionRate) return;

      const rate = Number(e.target.dataset.actionRate);
      const modalBody = document.querySelector(".modal-body");
      this.changeRate(rate);
      localStorage.setItem(`movie_rate_${modalBody.dataset.movieId}`, rate);
    });
  }

  changeRate(rate) {
    const selectRateParagraph = document.querySelector(".select-rate-text");
    const selectRate = document.querySelector(".select-rate");
    const buttons = document.querySelectorAll(".custom-rate .rate-button");

    switch (rate) {
      case 0:
        selectRate.innerText = "";
        selectRateParagraph.innerText = "별점을 매겨주세요.";
        break;
      case 2:
        selectRate.innerText = "2";
        selectRateParagraph.innerText = "최악이에요";
        break;
      case 4:
        selectRate.innerText = "4";
        selectRateParagraph.innerText = "별로에요";
        break;
      case 6:
        selectRate.innerText = "6";
        selectRateParagraph.innerText = "보통이에요";
        break;
      case 8:
        selectRate.innerText = "8";
        selectRateParagraph.innerText = "재미있어요";
        break;
      case 10:
        selectRate.innerText = "10";
        selectRateParagraph.innerText = "명작이에요";
        break;
      default:
        break;
    }

    for (const button of buttons) {
      const img = button.querySelector("img");

      const imgSrc =
        +button.dataset.actionRate > rate ? StarEmptyImg : StarFilledImg;
      img.src = imgSrc;
    }
  }

  template() {
    return `
            <div class="modal-body">
            <div class="modal-content-header side-padding">
                <div class="dummy"></div>
                <h3>영화 이름</h3>
                <button class="modal-close-button" data-action="modal-close">X</button>
            </div>
            <div class="modal-content-body side-padding">
              <img alt="영화 포스터 이미지">
              <div class="movie-details">
              <div class="movie-detail-header">
                <p class="movie-detail-genre"></p>
                <img src=${StarFilledImg} />
                <div class="movie-detail-vote-average"></div>
              </div>
              <div class="movie-detail-description"></div>
              <div class="custom-rate">
                <p>내 별점</p>
                <button class="rate-button" data-action-rate="2"><img src=${StarEmptyImg}></button>
                <button class="rate-button" data-action-rate="4"><img src=${StarEmptyImg}></button>
                <button class="rate-button" data-action-rate="6"><img src=${StarEmptyImg}></button>
                <button class="rate-button" data-action-rate="8"><img src=${StarEmptyImg}></button>
                <button class="rate-button" data-action-rate="10"><img src=${StarEmptyImg}></button>
                <p class="select-rate"></p>
                <p class="select-rate-text">별점을 매겨주세요.</p>
              </div>
            </div>
            </div>
        `;
  }
}

customElements.define("modal-component", ModalComponent);
