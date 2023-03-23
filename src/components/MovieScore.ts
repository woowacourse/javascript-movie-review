import { StarFilled, StartEmpty } from "../../images";
import { $ } from "../utils/dom";

class MovieScore extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    const score = this.getAttribute("movie-score") ?? "0";

    this.innerHTML = /* html */ `
        <span id="detail-score-title">내 별점</span> 
        <span id="detail-score-image">
            ${Array.from({ length: 5 })
              .map((_, index) => {
                return /* html */ `
              <img class="star" src="${
                Number(score) < (index + 1) * 2 ? StartEmpty : StarFilled
              }" class="star" alt="별점 ${(index + 1) * 2}" data-score="${
                  (index + 1) * 2
                }"/>
            `;
              })
              .join("")}
        </span>
        <span id="detail-score-description">
          ${this.getScoreMessage(score)}
        </span>
     `;
  }

  addEvent() {
    $("#detail-score-image", this)?.addEventListener("click", (event) =>
      this.onClickScoreImage(event)
    );
  }

  onClickScoreImage(event: Event) {
    if (event.target instanceof HTMLImageElement) {
      const score = <string>event.target.dataset.score;
      this.setAttribute("movie-score", score);
      this.render();
      this.addEvent();
    }
  }

  getScoreMessage(score: string) {
    switch (score) {
      case "0":
        return "";
      case "2":
        return "2 최악이예요";
      case "4":
        return "4 별로예요";
      case "6":
        return "6 보통이에요";
      case "8":
        return "8 재미있어요";
      case "10":
        return "10 명작이에요";
    }
  }
}

interface MovieScore {
  "movie-score": typeof MovieScore;
}

customElements.define("movie-score", MovieScore);

export default MovieScore;
