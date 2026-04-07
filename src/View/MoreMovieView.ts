import { getElementOrThrow } from "./utils";

interface MoreMovieViewDomType {
  button: HTMLButtonElement;
}

class MoreMovieView {
  #dom: MoreMovieViewDomType;

  constructor() {
    this.#dom = {
      button: getElementOrThrow<HTMLButtonElement>(".more-button"),
    };
  }

  hide() {
    this.#dom.button.style.display = "none";
  }

  show() {
    this.#dom.button.style.display = "";
  }

  disable() {
    this.#dom.button.disabled = true;
    this.#dom.button.style.cursor = "not-allowed";
  }

  able() {
    this.#dom.button.disabled = false;
    this.#dom.button.style.cursor = "pointer";
  }

  bindEvent(handler: () => void) {
    this.#dom.button.addEventListener("click", handler);
  }
}

export default MoreMovieView;
