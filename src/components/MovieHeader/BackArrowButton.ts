import ARROW_BACK from "../../../templates/arrow_back.png";
import createElement from "../utils/createElement";

interface BackArrowButtonProps {
  onClick: () => void;
}

class BackArrowButton {
  $element;

  private visible;

  constructor(props: BackArrowButtonProps) {
    this.visible = false;

    this.$element = createElement({
      tagName: "button",
      attribute: {
        class: `btn ${this.visible ? "" : "display-none"}`,
      },
      addEventListener: {
        click: props.onClick,
      },
      children: [
        createElement({
          tagName: "img",
          attribute: {
            src: ARROW_BACK,
            alt: "뒤로가기",
          },
        }),
      ],
    });
  }

  getElement() {
    return this.$element;
  }

  makeVisible() {
    this.visible = true;
    this.$element.classList.remove("display-none");
  }

  makeInvisible() {
    this.visible = false;
    this.$element.classList.add("display-none");
  }
}
export default BackArrowButton;
