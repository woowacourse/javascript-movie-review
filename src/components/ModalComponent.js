import CustomComponent from "../abstracts/CustomComponent";

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

    title.innerText = item.title;
    img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`;
    genre.innerText = item.genres.map((genre) => genre.name).join(", ");
    desciption.innerText = item.overview;
    voteAverage.innerText = item.vote_average;
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
  }

  template() {
    return `
            <div class="modal-body">
            <div class="content-header">
                <h3>영화 이름</h3>
                <button data-action="modal-close">닫기 버튼</button>
            </div>
            <div class="content-body">
              <img alt="영화 포스터 이미지">
              <div class="movie-details">
              <div class="movie-detail-header">
                <p class="movie-detail-genre">장르</p>
                <div class="movie-detail-vote-average">별점</div>
              </div>
              <div class="movie-detail-description"> 설명입니다. 설명입니다 </div>
              <div> 평점 매기기 </div>
            </div>
            </div>
        `;
  }
}

customElements.define("modal-component", ModalComponent);
