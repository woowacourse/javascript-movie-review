class LogoView {
  #dom;

  constructor() {
    this.#dom = {
      logo: document.querySelector(".logo"),
    };
  }

  bindEvent(handler: () => void) {
    this.#dom.logo!.addEventListener("click", handler);
  }
}

export default LogoView;
