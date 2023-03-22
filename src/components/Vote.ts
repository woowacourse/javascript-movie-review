import { StarFilled, StarEmpty } from "../../images";
import { $$ } from "../utils/dom";

class Vote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    this.innerHTML = /* html */ `
      <span class="user-vote-star">
        <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
      </span>
    `.repeat(5);
  }

  addEvent() {
    $$(".user-vote-star")?.forEach((star, index) => {
      star.addEventListener("click", () => {
        const starIcons = $$(".star-icon");
        const score = this.calculateScore(index);
        const message = this.showMessage(score);

        starIcons.forEach((icon, i) => {
          (<HTMLImageElement>icon).src = i <= index ? StarFilled : StarEmpty;
        });

        const event = new CustomEvent("voteScoreUpdated", {
          detail: { index, score, message },
        });
        this.dispatchEvent(event);
      });
    });
  }

  calculateScore(index: number) {
    let score = 0;
    score = (index + 1) * 2;
    return score;
  }

  showMessage(score: number) {
    let message = "";

    switch (score) {
      case 2:
        message = "최악이예요";
        break;
      case 4:
        message = "별로예요";
        break;
      case 6:
        message = "보통이에요";
        break;
      case 8:
        message = "재미있어요";
        break;
      case 10:
        message = "명작이에요";
        break;
      default:
        message = "별점을 눌러주세요";
        break;
    }
    return message;
  }
}

customElements.define("movie-vote", Vote);

export default Vote;
