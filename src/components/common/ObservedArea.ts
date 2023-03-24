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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.handleIntersect();
      });
    });

    observer.observe(<HTMLElement>$(".scroll-area"));
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
