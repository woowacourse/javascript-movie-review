import { RatingStorage } from "./storage/RatingStorage";

class StarRating {
  private container: HTMLElement;
  private movieId: number;
  private currentScore: number = 0;
  private hoverScore: number = 0;
  private storage: RatingStorage;

  constructor(container: HTMLElement, movieId: number, storage: RatingStorage) {
    this.container = container;
    this.movieId = movieId;
    this.storage = storage;

    // storage에서 현재 연 영화 별점 업데이트
    this.currentScore = this.storage.getRating(this.movieId);

    this.bindRatingEvents();
    this.updateRatingUI();
  }

  private bindRatingEvents() {
    // 마우스 호버 이벤트 => image가 filled로 변경 혹은 다시 원래대로
    const stars = Array.from(this.container.querySelectorAll(".star.my-star"));

    this.container.addEventListener("mouseover", (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".star.my-star")) {
        const targetStar = (e.target as HTMLElement).closest(".star.my-star");
        const targetStarIndex = stars.indexOf(targetStar as HTMLElement);

        this.hoverScore = (targetStarIndex + 1) * 2;
        this.updateRatingUI();
      }
    });
    this.container.addEventListener("mouseout", (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".star.my-star")) {
        this.hoverScore = 0;
        this.updateRatingUI();
      }
    });

    // 클릭 이벤트 => image가 선택한 갯수대로 filled되고 텍스트 및 숫자 업데이트
    this.container.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".star.my-star")) {
        const targetStar = (e.target as HTMLElement).closest(".star.my-star");
        const targetStarIndex = stars.indexOf(targetStar as HTMLElement);
        this.currentScore = (targetStarIndex + 1) * 2;
        this.updateRatingUI();

        this.storage.setRating(this.movieId, this.currentScore);
      }
    });
  }

  private updateRatingUI() {
    const stars = Array.from(this.container.querySelectorAll(".star.my-star"));
    const starFilled = "./images/star_filled.png";
    const starEmpty = "./images/star_empty.png";

    let displayScore = this.currentScore;
    if (this.hoverScore > 0) {
      displayScore = this.hoverScore;
    }
    const starIndex = displayScore / 2 - 1;

    const scoreContainer = this.container.querySelector(
      ".my-score",
    ) as HTMLElement;
    const scoreLabel = this.container.querySelector(
      ".my-score-label",
    ) as HTMLElement;
    const rateValue = this.container.querySelector(
      ".my-rate-value",
    ) as HTMLElement;

    const scoreLabelObject: Record<number, string> = {
      2: "최악이예요",
      4: "별로예요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    // 0점일 때는 텍스트 영역 숨기기
    if (displayScore === 0) {
      if (scoreContainer) scoreContainer.style.display = "none";
    } else {
      if (scoreContainer) scoreContainer.style.display = "flex";

      if (scoreLabel)
        scoreLabel.textContent = `${scoreLabelObject[displayScore]}`;
      if (rateValue) rateValue.textContent = `(${displayScore}/10)`;
    }

    // 별 이미지 바꿔주기
    stars.forEach((star, index) => {
      const starElement = star as HTMLImageElement;
      if (index <= starIndex) {
        starElement.src = starFilled;
      } else {
        starElement.src = starEmpty;
      }
    });
  }

  public getScore() {
    return this.currentScore;
  }
}

export default StarRating;
