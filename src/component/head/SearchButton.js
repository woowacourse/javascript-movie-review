import CustomElement from "../basic/CustomElement";

class SearchButton extends CustomElement {
  template() {
    return `<button type="button" class="search-button"/>`;
  }
}

customElements.define("search-button", SearchButton);

export default SearchButton;
