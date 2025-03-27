import myRateStorage from "./myRateStorage";

interface MyRateContract {
  ui: string;
  attachEvents: () => void;
}

class MyRate implements MyRateContract {
  static #RATING_MESSAGES: Record<number, string> = {
    0: "아직 평가가 없어요",
    2: "별로에요",
    4: "그냥 그래요",
    6: "볼만해요",
    8: "명작이에요",
    10: "인생 영화에요",
  };

  constructor(private movieId: number) {}

  public get ui() {
    const currentRate = myRateStorage.getRate(this.movieId);
    const message =
      currentRate === 0
        ? MyRate.#RATING_MESSAGES[0]
        : `${MyRate.#RATING_MESSAGES[currentRate]} (${currentRate}/10)`;
    const stars = Array.from({ length: 5 })
      .map((_, i) => {
        return `
          <img 
            src="./images/star_empty.png" 
            class="star" 
            alt="Star" 
            data-value="${(i + 1) * 2}"
          />
        `;
      })
      .join("");

    return /*html*/ `
      <div class="modal-section myRate">
        <h3>내 별점</h3>
        <div class="myRate-container">
          <div class="star-wrapper">
            ${stars}
          </div>
          <p class="myRate-message">${message}</p>
        </div>
      </div>
    `;
  }

  public attachEvents(): void {
    const container = document.querySelector(".star-wrapper");
    if (!container) return;
    const starNodes = Array.from(container.querySelectorAll(".star"));
    if (!starNodes.length) return;

    this.#updateStarUI(starNodes, myRateStorage.getRate(this.movieId));
    starNodes.forEach((starNode, index) => {
      starNode.addEventListener("click", () => {
        const newRating = (index + 1) * 2;
        myRateStorage.setRate(this.movieId, newRating);
        this.#updateStarUI(starNodes, newRating);
      });
    });
  }

  #updateStarUI(starNodes: Element[], rating: number): void {
    const filledCount = rating / 2;
    starNodes.forEach((starNode, index) => {
      const img = starNode as HTMLImageElement;
      img.src =
        index < filledCount
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
    });
    const parent = starNodes[0].closest(".myRate-container");
    if (!parent) return;
    const messageElem = parent.querySelector(".myRate-message");
    if (!messageElem) return;
    const text =
      rating === 0
        ? MyRate.#RATING_MESSAGES[0]
        : `${MyRate.#RATING_MESSAGES[rating]} (${rating}/10)`;
    messageElem.textContent = text;
  }
}

export default MyRate;
