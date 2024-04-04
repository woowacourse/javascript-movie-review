import StarRatingIcon from "./StarRatingIcon";
import createElement from "../../utils/createElement";
import createStarIcon from "./StarRatingIcon";

class StarRating {
  element = createElement("section", { attrs: { class: "star-rating" } });

  #stars;

  get value() {
    const nowStar = this.#stars.find((icon) => icon.isChecked);
    if (nowStar === undefined) return -1;
    return Number(nowStar.value);
  }

  set value(number: number) {
    this.#stars.forEach((star) => {
      if (Number(star.value) <= number) {
        star.turnOn();
      }
      if (Number(star.value) === number) {
        star.check();
      }
      if (Number(star.value) > number) {
        star.turnOff();
      }
    });
  }

  constructor(option?: {
    starNumber?: number;
    increase?: number;
    start?: number;
    idTail?: string | number;
  }) {
    const {
      starNumber = 5,
      increase = 1,
      start = 2,
      idTail = new Date().getTime() + Math.random(),
    } = option ?? {};
    this.#stars = Array.from({ length: Math.max(starNumber, 0) }).map(
      (_, index) => new StarRatingIcon(start + index * increase, idTail)
    );
    this.element.append(...this.#stars.map((icon) => icon.element));
    this.setStarsEventAction();
  }

  setStarsEventAction() {
    this.#stars.forEach((star, index) =>
      star.element.addEventListener("click", () => {
        this.value = Number(star.value);
      })
    );
  }
}

export default StarRating;
