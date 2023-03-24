import { $, dispatchCustomEvent } from "../../utils/dom";

class SearchBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    this.innerHTML = /* html */ `
      <form id="search-form">
        <input id="search-input" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
    `;
  }

  addEvent() {
    $("form", this)?.addEventListener("submit", (event) => {
      this.onSubmitForm(event);
    });
  }

  onSubmitForm(event: Event) {
    event.preventDefault();

    const form = <HTMLFormElement>event.target;
    const input = <HTMLInputElement>$("input[type='text']", form);

    dispatchCustomEvent(this, {
      eventType: "searchMovieData",
      data: input.value,
    });

    form.reset();
  }
}

customElements.define("search-box", SearchBox);
