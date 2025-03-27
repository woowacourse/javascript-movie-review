import { pipe } from "@zoeykr/function-al";
import { localStorageStore } from "../../../../storage";

interface MyRateContract {
  ui: string;
  attachEvents: () => void;
}

const myRateStorage = {
  getRate(movieId: number): number {
    const key = `myRate-${movieId}`;
    const rate = localStorageStore.get<number>(key);
    return rate !== null ? rate : 0;
  },
  setRate(movieId: number, rate: number): void {
    const key = `myRate-${movieId}`;
    localStorageStore.set<number>(key, rate);
  },
};

class MyRate implements MyRateContract {
  static readonly #RATING_MESSAGES: Record<number, string> = {
    0: "아직 평가가 없어요",
    2: "최악이예요",
    4: "별로예요",
    6: "보통이에요",
    8: "재미있어요",
    10: "명작이에요",
  };

  #movieId: number;

  constructor(movieId: number) {
    this.#movieId = movieId;
  }

  public get ui() {
    const currentRate = myRateStorage.getRate(this.#movieId);
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

    starNodes.forEach((starNode, index) => {
      starNode.addEventListener("click", () => {
        const handleStarClick = pipe(
          (i: number) => (i + 1) * 2,
          (newRating: number) => {
            myRateStorage.setRate(this.#movieId, newRating);
            return newRating;
          },
          (newRating: number) => this.#updateStarUI(starNodes, newRating)
        );

        handleStarClick(index);
      });
    });

    this.#updateStarUI(starNodes, myRateStorage.getRate(this.#movieId));
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
