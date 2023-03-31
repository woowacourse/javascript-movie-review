import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MobileSearchButton extends CustomElement {
  template() {
    return `<button type="button" class="mobile-search-button"/>`;
  }

  setEvent() {
    this.addEventListener("click", () => {
      this.classList.add("hide");
      $("search-input").classList.add("show");
    });
  }
}

customElements.define("mobile-search-button", MobileSearchButton);

export default MobileSearchButton;
