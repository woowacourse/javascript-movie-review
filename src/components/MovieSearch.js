import { $ } from "../utils/Dom";

export default class MovieSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
         <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
         </div>
        `;
    this.setEvent();
  }

  setEvent() {
    $(".search-button").addEventListener("click", () => {
      this.createSearchMovieEvent();
    });

    $("input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.createSearchMovieEvent();
    });
  }

  createSearchMovieEvent() {
    const movieName = $("input").value;
    this.dispatchEvent(
      new CustomEvent("search-movie", { bubbles: true, detail: movieName })
    );
  }
}

customElements.define("movie-search", MovieSearch);
