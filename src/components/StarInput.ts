import { SCORE_COMMENT } from "../constants/data";
import { getLocalstorage, setLocalstorage } from "../utils/localStorage";
import { $ } from "../utils/selector";

export class StarInput {
  private _id: number;
  private _score: number;

  constructor(id: number) {
    this._id = id;
    this._score =
      getLocalstorage(this._id) !== null ? getLocalstorage(this._id) : -1;
    this.render();
    this.handleEvent();
  }

  create() {
    return `
            <section class="score" id=${this._id}>
            ${this.getCountedStar()}
            </section>
        `;
  }

  getCountedStar() {
    return (
      `<strong class="my-score">내 별점</strong><div class="score__img-wrapper">` +
      Array.from({ length: 5 })
        .map((_, idx) => {
          return idx <= this._score
            ? `<img src="/star_filled.png" class="star-img" id=${idx} />`
            : `<img src="/star_empty.png" class="star-img" id=${idx} />`;
        })
        .join("") +
      `</div><strong class="score__count">${(this._score + 1) * 2}</strong>
      <strong class="score__comment">${
        SCORE_COMMENT[(this._score + 1) * 2]
      }</strong>`
    );
  }

  render() {
    const modal = $(".modal__info") as HTMLElement;
    modal.insertAdjacentHTML("beforeend", this.create());
  }

  rerenderStarImages() {
    const scoreBox = $(".score") as HTMLElement;
    scoreBox.innerHTML = "";
    scoreBox.innerHTML = this.getCountedStar();
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
    const starBox = $(".score") as HTMLElement;
    starBox.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.className === "star-img") {
        this.updateStarImage(target);
        this.save();
      }
    });
  }

  save() {
    setLocalstorage<Number, Number>(this._id, this._score);
  }
  getPrevScore() {
    return getLocalstorage<Number>(this._id);
  }
}
