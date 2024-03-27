import LOGO from "../../../templates/logo.png";
import createElement from "../utils/createElement";

interface MovieHomeLogoProps {
  onClick: () => void;
}

class MovieHomeLogo {
  $element;

  private visible;

  constructor(props: MovieHomeLogoProps) {
    this.visible = true;

    this.$element = createElement({
      tagName: "h1",
      attribute: {
        class: `${this.visible ? "" : "display-none"}`,
      },
      addEventListener: {
        click: props.onClick,
      },
      children: [
        createElement({
          tagName: "img",
          attribute: { src: LOGO, alt: "MovieList 로고" },
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

export default MovieHomeLogo;
