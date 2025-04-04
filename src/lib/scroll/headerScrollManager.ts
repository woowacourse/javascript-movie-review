import { $ } from "../../util/selector";

class HeaderScrollManager {
  #threshold: number;
  #headerElement: HTMLElement;

  constructor(threshold = 300) {
    this.#threshold = threshold;
    this.#headerElement = $("header")!;
  }

  bind() {
    window.addEventListener("scroll", this.#onScroll);
  }

  unbind() {
    window.removeEventListener("scroll", this.#onScroll);
  }

  #onScroll = () => {
    if (window.scrollY > this.#threshold) {
      this.#headerElement.classList.add("scrolled");
    } else {
      this.#headerElement.classList.remove("scrolled");
    }
  };
}

export default HeaderScrollManager;
