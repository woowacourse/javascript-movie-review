import { getElementOrThrow } from "./utils";

interface LogoViewDomType {
  logo: HTMLButtonElement;
}

class LogoView {
  #dom: LogoViewDomType;

  constructor() {
    this.#dom = {
      logo: getElementOrThrow<HTMLButtonElement>(".logo"),
    };
  }

  bindEvent(handler: () => void) {
    this.#dom.logo.addEventListener("click", handler);
  }
}

export default LogoView;
