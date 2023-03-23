import { StarFilled, StarEmpty } from "../../images";
import { $, $$ } from "../utils/dom";

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
      <div class="user-vote">
        <span class="vote-title">내 별점</span>
        <div class="vote-stars">
          <span class="user-vote-star">
          <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
          </span>
          <span class="user-vote-star">
          <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
          </span>
          <span class="user-vote-star">
          <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
          </span>
          <span class="user-vote-star">
          <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
          </span>
          <span class="user-vote-star">
          <img class="star-icon" src="${StarEmpty}" alt="start-empty" />
          </span>
        </div>
        <span class="vote-score">0</span>
        <span class="vote-message">별점을 눌러주세요</span>
      </div>`;
  }

  addEvent() {
    $$(".user-vote-star")?.forEach((star, index) => {
      star.addEventListener("click", () => {
        this.onHandleVoteData(index);
      });
    });
  }

  onHandleVoteData(index: number) {
    const starIcons = $$(".star-icon");
    const score = this.calculateScore(index);
    const message = this.showMessage(score);

    starIcons.forEach((icon, i) => {
      (<HTMLImageElement>icon).src = i <= index ? StarFilled : StarEmpty;
    });

    const $voteScore = $(".vote-score");
    const $voteMessage = $(".vote-message");

    if ($voteScore) $voteScore.textContent = score.toString();
    if ($voteMessage) $voteMessage.textContent = message;
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
