import { $ } from "../utils/selector";

export class StarInput {
  private _id: number;
  private _score: number;

  constructor(id: number, score: number) {
    this._id = id;
    this._score = score;
    this.render();
  }

  create() {
    return `
            <section class="score" id=${this._id}>
                <strong class="my-score">내 별점</strong>
                <div class="score__img-wrapper">
                ${this.getCountedStar(this._score, "filled")}
                ${this.getCountedStar(5 - this._score, "empty")}
                </div>
                <strong class="score__count">6</strong>
                <strong class="score__comment">보통이에요</strong>
            </section>
        `;
  }

  getCountedStar(starCount: number, starCategory: String) {
    return Array.from({ length: starCount })
      .map(() => {
        return `<img src="/star_${starCategory}.png" />`;
      })
      .join("");
  }

  render() {
    const modal = $(".modal__info") as HTMLElement;
    modal.insertAdjacentHTML("beforeend", this.create());
  }
}
