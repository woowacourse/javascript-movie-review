import FILLED_STAR from "../../public/images/star_filled.png";
import EMPTY_STAR from "../../public/images/star_empty.png";

class MyStarRatingView {
  #myStarImageArray: (HTMLImageElement | null)[] = [];
  #myStarEvaluation;
  #myStarScore;

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.#myStarImageArray[i] = document.querySelector<HTMLImageElement>(`#my-star-image-${i + 1}`);
    };
    this.#myStarEvaluation = document.querySelector<HTMLElement>("#my-star-evaluation");
    this.#myStarScore = document.querySelector<HTMLElement>("#my-star-score");
  };

  bindHandleMyStarClick() {
    this.#myStarImageArray.forEach((item, index) => {
      item?.addEventListener("click", () => {
        for (let i = 0; i <= index; i++) {
          const star = this.#myStarImageArray[i];
          if (star) star.src = `${FILLED_STAR}`;
        };

        for (let i = index + 1; i < 5; i++) {
          const star = this.#myStarImageArray[i];
          if (star) star.src = `${EMPTY_STAR}`;
        };
        
        if (this.#myStarEvaluation) {
          this.#myStarEvaluation.innerText = `${item.dataset.comment}`;
        };

        if (this.#myStarScore) {
          this.#myStarScore.innerText = `${item.dataset.score}`;
        };
      });
    });
  };
};

export const myStarRatingView = new MyStarRatingView();
