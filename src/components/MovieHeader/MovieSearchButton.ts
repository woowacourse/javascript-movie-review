import createElement from "../utils/createElement";

type onClickType = () => void;

interface MovieSearchButtonProps {
  onClick: onClickType;
}

class MovieSearchButton {
  private $element;

  private visible;

  constructor({ onClick }: MovieSearchButtonProps) {
    this.visible = true;

    this.$element = this.generateElement(onClick);
  }

  getElement() {
    return this.$element;
  }

  makeVisible() {
    this.visible = true;
    this.$element.style.display = "block";
  }

  makeInvisible() {
    this.visible = false;
    this.$element.style.display = "none";
  }

  private generateElement(onClick: onClickType) {
    const $button = createElement({
      tagName: "button",
      attribute: {
        class: `search-box-creator-button`,
      },
    });

    const $div = createElement({
      tagName: "div",
      attribute: {
        class: `search-box-creator ${this.visible ? "" : "display-none"}`,
      },
      addEventListener: {
        click: onClick,
      },
      children: [$button],
    });

    return $div;
  }
}

export default MovieSearchButton;
