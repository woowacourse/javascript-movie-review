import createElement from "../../../utils/createElement";

class MovieMoreButton {
  private $element: HTMLElement;

  private enabled: boolean;

  constructor({ onClickHandler }: { onClickHandler: () => void }) {
    this.$element = this.generateMovieMoreButton(onClickHandler);
    this.enabled = false;
  }

  getElement() {
    return this.$element;
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  removeElement() {
    this.$element.remove();
  }

  click() {
    if (this.enabled) {
      this.$element.click();
    }
  }

  registerToIntersectionObserver(intersectionObserver: IntersectionObserver) {
    intersectionObserver.observe(this.$element);
  }

  unregisterToIntersectionObserver(intersectionObserver: IntersectionObserver) {
    intersectionObserver.unobserve(this.$element);
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
