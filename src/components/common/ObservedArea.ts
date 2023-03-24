import { dispatchCustomEvent, $ } from "../../utils/dom";

class ObservedArea extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    this.innerHTML = `<div class="scroll-area"></div>`;
  }

  addEvent() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.handleIntersect();
          }
        });
      },
      {
        threshold: 0.9,
      }
    );
    observer.observe(document.querySelector(".scroll-area") as HTMLElement);
  }

  handleIntersect() {
    const container = <HTMLElement>$("movie-list-container");
    dispatchCustomEvent(container, {
      eventType: "fetchMovieData",
      data: container.getAttribute("type"),
    });
  }
}

interface ObservedArea {
  "observed-area": typeof ObservedArea;
}

customElements.define("observed-area", ObservedArea);

export default ObservedArea;
