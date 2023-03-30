import { dispatchCustomEvent, $ } from "../../utils/dom";

class ObservedArea extends HTMLElement {
  observer;

  constructor() {
    super();

    this.observer = this.createObserver();
  }

  connectedCallback() {
    this.render();
    this.startObserving(<HTMLElement>$(".scroll-area"));
  }

  render() {
    this.innerHTML = `<div class="scroll-area"></div>`;
  }

  createObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.handleIntersect();
      });
    });
    return observer;
  }

  startObserving(element: HTMLElement) {
    this.observer.observe(element);
  }

  endObserving(element: HTMLElement) {
    this.observer.unobserve(element);
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
