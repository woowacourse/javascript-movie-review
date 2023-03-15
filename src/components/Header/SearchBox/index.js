import "./index.css";

class SearchBox {
  $target;

  constructor($target) {
    this.$target = $target;

    this.render();
  }

  template() {
    return `
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default SearchBox;
