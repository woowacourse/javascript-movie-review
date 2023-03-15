import logoImage from "../../../templates/logo.png";

export class Header {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    this.render();
  }

  render() {
    this.#$target.innerHTML = `
        <h1><img src="${logoImage}" alt="MovieList 로고" /></h1>
        <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
        </div>
    `;
  }
}
