import { getSavedData } from "./../utils/localStorage";
import { StarFilled, StarEmpty } from "../../images";
import { $, $$ } from "../utils/dom";
import { saveData } from "../utils/localStorage";

class Vote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="user-vote">
        <span class="vote-title">내 별점</span>
        <div class="vote-stars">
          <img class="star-icon" data-order="1" src="${StarEmpty}" alt="start" />
          <img class="star-icon" data-order="2" src="${StarEmpty}" alt="start" />
          <img class="star-icon" data-order="3" src="${StarEmpty}" alt="start" />
          <img class="star-icon" data-order="4" src="${StarEmpty}" alt="start" />
          <img class="star-icon" data-order="5" src="${StarEmpty}" alt="start" />
        </div>
        <span class="vote-score">0</span>
        <span class="vote-message">별점을 눌러주세요</span>
      </div>`;

    this.judgeProcess();
  }

  judgeProcess() {
    const id = Number(this.getAttribute("modal-id"));
    const order = getSavedData("modalData")[id];

    if (order) {
      this.renderScoreAndMessage(order);
    }
    this.addClickStarEvent();
  }

  addClickStarEvent() {
    $(".vote-stars")?.addEventListener("click", (event) => {
      const id = Number(this.getAttribute("modal-id"));
      const target = <HTMLElement>event.target;
      const order = Number(
        (<HTMLElement>target.closest(".star-icon"))?.dataset.order
      );

      if (!id) return;
      if (!order) return;

      this.renderScoreAndMessage(order);
      this.saveUserOrder(id, order);
    });
  }

  renderScoreAndMessage(order: number) {
    const $voteScore = $(".vote-score");
    const $voteMessage = $(".vote-message");
    const message = this.showMessage(order);

    if ($voteScore) $voteScore.textContent = String(order * 2);
    if ($voteMessage) $voteMessage.textContent = message;

    this.renderStar(order);
  }

  renderStar(order: number) {
    $$(".star-icon")?.forEach((star, index) => {
      (<HTMLImageElement>star).src = index < order ? StarFilled : StarEmpty;
    });
  }

  showMessage(order: number) {
    let message = "";

    switch (order) {
      case 1:
        message = "최악이예요";
        break;
      case 2:
        message = "별로예요";
        break;
      case 3:
        message = "보통이에요";
        break;
      case 4:
        message = "재미있어요";
        break;
      case 5:
        message = "명작이에요";
        break;
      default:
        message = "별점을 눌러주세요";
        break;
    }
    return message;
  }

  saveUserOrder(id: number, order: number) {
    const userData = {
      ...getSavedData("modalData"),
      [id]: order,
    };

    saveData("modalData", userData);
  }
}

customElements.define("movie-vote", Vote);

export default Vote;
