import FILLED_STAR from "../../public/images/star_filled.png";
import EMPTY_STAR from "../../public/images/star_empty.png";

class MyStarRatingView {
  #myStarImageArray: (HTMLImageElement | null)[] = [];
  #myStarEvaluation;
  #myStarScore;
  #evaluation: Record<number, string> = {
    0: "나의 별점을 눌러보세요.",
    2: "최악이예요",
    4: "별로예요",
    6: "보통이에요",
    8: "재미있어요",
    10: "명작이에요",
  };

  constructor() {
    for (let i = 1; i <= 5; i++) {
      this.#myStarImageArray[i] = document.querySelector<HTMLImageElement>(`#my-star-image-${i}`);
    };
    this.#myStarEvaluation = document.querySelector<HTMLElement>("#my-star-evaluation");
    this.#myStarScore = document.querySelector<HTMLElement>("#my-star-score");
  };

  bindHandleMyStarClick(handler: (score: number) => void) {
    this.#myStarImageArray.forEach((item) => {
      item?.addEventListener("click", () => {
        const score = Number(item.dataset.score);
        this.renderRating( score);
        handler(score);
      });
    });
  };

  renderRating(score: number) {
    const index = score / 2;

    for (let i = 1; i <= 5; i++) {
      const star = this.#myStarImageArray[i];

      if (star) {
        star.src = (i <= index) ? `${FILLED_STAR}` : `${EMPTY_STAR}`;
      }
    };
        
    if (this.#myStarEvaluation) {
      this.#myStarEvaluation.innerText = `${this.#evaluation[score]}`;
    };

    if (this.#myStarScore) {
      this.#myStarScore.innerText = `${score}`;
    };
  };
};

export const myStarRatingView = new MyStarRatingView();
