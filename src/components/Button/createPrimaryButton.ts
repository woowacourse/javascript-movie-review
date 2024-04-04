import createElement from "../../utils/createElement";

class PrimaryButton {
  element;

  constructor(options?: {
    content?: string;
    type?: "full-width" | "opacity-zero";
    onClickFunc?: (event?: Event) => void;
  }) {
    const {
      content = "",
      type = "full-width",
      onClickFunc = () => {},
    } = options ?? {};
    this.element = createElement<HTMLButtonElement>("button", {
      content,
      attrs: { class: `btn primary${type ? " " + type : ""}` },
    });
    if (onClickFunc) this.element.onclick = onClickFunc;
  }
}

export default PrimaryButton;
