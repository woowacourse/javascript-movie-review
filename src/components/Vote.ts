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
          <img class="star-icon" data-order="1" src="${StarEmpty}" alt="start-empty" />
          <img class="star-icon" data-order="2" src="${StarEmpty}" alt="start-empty" />
          <img class="star-icon" data-order="3" src="${StarEmpty}" alt="start-empty" />
          <img class="star-icon" data-order="4" src="${StarEmpty}" alt="start-empty" />
          <img class="star-icon" data-order="5" src="${StarEmpty}" alt="start-empty" />
        </div>
        <span class="vote-score">0</span>
        <span class="vote-message">별점을 눌러주세요</span>
      </div>`;
  }

  addEvent() {
    const id = this.getAttribute("modal-id");

    $(".vote-stars")?.addEventListener("click", (event) => {
      this.onHandleVoteData(event);
    });
  }

  onHandleVoteData(event: Event) {
    const target = <HTMLElement>event.target;
    const order = Number(
      (<HTMLElement>target.closest(".star-icon"))?.dataset.order
    );

    if (!order) return;

    this.renderStar(order);
    this.renderScoreAndMessage(order);
  }

  renderStar(order: number) {
    $$(".star-icon")?.forEach((star, index) => {
      (<HTMLImageElement>star).src = index < order ? StarFilled : StarEmpty;
    });
  }

  renderScoreAndMessage(order: number) {
    const $voteScore = $(".vote-score");
    const $voteMessage = $(".vote-message");
    const message = this.showMessage(order);

    if ($voteScore) $voteScore.textContent = String(order * 2);
    if ($voteMessage) $voteMessage.textContent = message;
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
