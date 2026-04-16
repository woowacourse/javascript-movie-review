import { requireElement } from "../utils/dom";

class Logo {
  #logo: Element;

  constructor(private onReset: () => void) {
    this.#logo = requireElement(".logo");
  }

  bindEvent() {
    this.#logo.addEventListener("click", this.onReset);
  }
}

export default Logo;
