import SearchBar from "./SearchBar";

class Header {
  #parentElement;
  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#render();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
        <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
        </h1>
        ${SearchBar()}
    `;
  }
}

export default Header;
