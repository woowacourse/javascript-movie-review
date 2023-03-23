import { $ } from "../utils/selector";

export class StarInput {
  private _id: number;
  private _score: number;

  constructor(id: number) {
    this._id = id;
    this._score = -1;
    this.render();
    this.handleEvent();
  }

  create() {
    return `
            <section class="score" id=${this._id}>
                <strong class="my-score">내 별점</strong>
                <div class="score__img-wrapper">
                ${this.getCountedStar()}
                </div>
                <strong class="score__count">6</strong>
                <strong class="score__comment">보통이에요</strong>
            </section>
        `;
  }

  getCountedStar() {
    return Array.from({ length: 5 })
      .map((_, idx) => {
        return idx <= this._score
          ? `<img src="/star_filled.png" class="star-img" id=${idx} />`
          : `<img src="/star_empty.png" class="star-img" id=${idx} />`;
      })
      .join("");
  }

  render() {
    const modal = $(".modal__info") as HTMLElement;
    modal.insertAdjacentHTML("beforeend", this.create());
  }

  rerenderStarImages() {
    const imageWrapper = $(".score__img-wrapper") as HTMLElement;
    imageWrapper.innerHTML = "";
    imageWrapper.innerHTML = this.getCountedStar();
  }

  updateScore(score: number) {
    this._score = score;
  }

  updateStarImage(targetElement: HTMLElement) {
    Number(targetElement.id) > this._score
      ? this.updateScore(Number(targetElement.id))
      : this.updateScore(Number(targetElement.id) - 1);
    this.rerenderStarImages();
  }

  handleEvent() {
    const starBox = $(".score__img-wrapper") as HTMLElement;
    starBox.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.className === "star-img") {
        this.updateStarImage(target);
      }
    });
  }
}
