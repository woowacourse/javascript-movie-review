import { $ } from "../utils/Dom";

export default class CardList extends HTMLElement {
  #movieList = [];

  get header() {
    return this.getAttribute("header");
  }

  connectedCallback() {
    this.innerHTML = `
        <h2>${this.header}</h2>
        <ul class="item-list">
        </ul>
        `;
  }

  setMovieList(movieList) {
    this.#movieList = movieList;
    const moreButton = $("more-button");
    if (this.#movieList.length < 20) moreButton.style.display = "none";

    const ItemList = $(".item-list");
    this.#movieList.forEach((item) => {
      ItemList.insertAdjacentHTML(
        "beforeend",
        `<movie-card title='${item.title}' poster='${item.poster}' rating='${item.rating}'></movie-card>`
      );
    });
  }
}

customElements.define("card-list", CardList);
