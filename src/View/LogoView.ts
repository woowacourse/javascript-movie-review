class LogoView {
  #dom;

  constructor() {
    this.#dom = {
      logo: document.querySelector(".logo"),
    };
  }

  bindEvent() {
    this.#dom.logo!.addEventListener("click", () => {
      location.reload();
    });
  }
}

export default LogoView;
