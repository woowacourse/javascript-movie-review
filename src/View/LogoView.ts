import { getElementOrThrow } from "./utils";

interface LogoViewDomType {
  logo: HTMLHeadingElement;
}

class LogoView {
  #dom: LogoViewDomType;

  constructor() {
    this.#dom = {
      logo: getElementOrThrow<HTMLHeadingElement>(".logo"),
    };
  }

  bindEvent(handler: () => void) {
    this.#dom.logo.addEventListener("click", handler);
  }
}

export default LogoView;
