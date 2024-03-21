import createElement from "../../../utils/createElement";

class MovieMoreButton {
  $element;
  disabled;

  constructor({ onClickHandler }: { onClickHandler: () => void }) {
    this.$element = this.generateMovieMoreButton(onClickHandler);
    this.disabled = true;
  }

  private generateMovieMoreButton(onClickHandler: () => void) {
    return createElement({
      tagName: "button",
      attribute: {
        class: `btn primary full-width disabled`,
        disabled: "disabled",
      },
      addEventListener: {
        click: () => {
          onClickHandler();
        },
      },
      children: ["더 보기"],
    });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    this.$element.classList.toggle("disabled");

    if (this.disabled) {
      this.$element.setAttribute("disabled", "disabled");
      return;
    }

    this.$element.removeAttribute("disabled");
  }
}

export default MovieMoreButton;
