import { $, dispatchCustomEvent } from "./../utils/dom";

customElements.define(
  "search-box",
  class SearchBox extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
        <form id="search-form">
          <input id="search-input" type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      `;

      this.addEvent();
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
);
