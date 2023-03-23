import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class SearchButton extends CustomElement {
  template() {
    return `<button type="button" class="mobile-search-button"/>`;
  }

  setEvent() {
    this.addEventListener("click", () => {
      this.hidden = true;
      $("search-input").hidden = false;
    });
  }
}

customElements.define("search-button", SearchButton);

export default SearchButton;
