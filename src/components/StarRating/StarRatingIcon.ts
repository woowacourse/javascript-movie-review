import "./style.css";

import createElement from "../../utils/createElement";
import starEmpty from "./star_empty.png";
import starFilled from "./star_filled.png";

class StarRatingIcon {
  element;
  #value;
  #emptyStar = createElement("img", {
    attrs: { class: "star-rating__empty-icon", src: starEmpty },
  });

  #filledStar = createElement("img", {
    attrs: { class: "star-rating__filled-icon", src: starFilled },
  });

  #input;

  get value() {
    return this.#value;
  }

  get isChecked() {
    return this.#input.checked;
  }

  check() {
    this.#input.checked = true;
  }

  turnOn() {
    this.#emptyStar.classList.add("display-none");
    this.#filledStar.classList.remove("display-none");
  }

  turnOff() {
    this.#emptyStar.classList.remove("display-none");
    this.#filledStar.classList.add("display-none");
  }

  constructor(
    value: number,
    idTail: number | string = new Date().getTime() + Math.random(),
    isOn: boolean = false
  ) {
    this.#value = Math.round(value).toString();
    const nowId = `star-${this.#value}-${idTail}`;

    this.element = createElement<HTMLLabelElement>("label", {
      attrs: { class: "star-rating__label", for: nowId },
    });

    this.#input = createElement<HTMLInputElement>("input", {
      attrs: {
        type: "radio",
        id: nowId,
        class: "star-rating__radio",
        value: this.#value.toString(),
        name: idTail.toString(),
      },
    });
    if (isOn) this.turnOn();
    if (!isOn) this.turnOff();

    this.element.append(this.#input, this.#emptyStar, this.#filledStar);
  }
}
export default StarRatingIcon;
