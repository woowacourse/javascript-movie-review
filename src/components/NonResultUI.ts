import { selectElement, toggleElementVisibility } from "../utils/ui.ts";

class NonResultUI {
  #parent;
  #element;
  static #instance: NonResultUI;

  constructor() {
    this.#parent = selectElement("main section");
    this.#element = document.createElement("div");
    this.#element.classList.add("no-thumbnail", "hidden");

    this.#create();
  }

  static getInstance(): NonResultUI {
    if (!NonResultUI.#instance) {
      NonResultUI.#instance = new NonResultUI();
    }

    return NonResultUI.#instance;
  }

  #create() {
    const image = this.#createImage();
    const message = this.#createMessage();

    this.#element.insertAdjacentElement("beforeend", image);
    this.#element.insertAdjacentElement("beforeend", message);
    this.#parent.insertAdjacentElement("beforeend", this.#element);
  }

  #createImage() {
    const image = document.createElement("img");
    image.src = "./images/no_result_icon.png";
    image.alt = "결과없음";

    return image;
  }

  #createMessage() {
    const message = document.createElement("h2");
    message.textContent = "검색 결과가 없습니다.";

    return message;
  }

  toggle(totalItems: number) {
    if (totalItems === 0) {
      toggleElementVisibility(this.#element, "show");
    } else {
      toggleElementVisibility(this.#element, "hidden");
    }
  }
}

export default NonResultUI;
