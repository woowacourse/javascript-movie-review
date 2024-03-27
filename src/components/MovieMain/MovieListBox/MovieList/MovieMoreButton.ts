import createElement from "../../../utils/createElement";

class MovieMoreButton {
  $element;
  disabled;

  constructor({ onClickHandler }: { onClickHandler: () => void }) {
    this.$element = this.generateMovieMoreButton(onClickHandler);
    this.disabled = true;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  removeMovieMoreButton() {
    this.$element.remove();
  }

  private generateMovieMoreButton(onClickHandler: () => void) {
    return createElement({
      tagName: "div",
      addEventListener: {
        click: () => {
          onClickHandler();
        },
      },
    });
  }
}

export default MovieMoreButton;
