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
    this.querySelector(".search-button").addEventListener("click", () => {
      this.createSearchMovieEvent();
    });

    this.querySelector("input").addEventListener(
      "keypress",
      (dispatchEvent) => {
        if (event.key === "Enter") this.createSearchMovieEvent();
      }
    );
  }

  createSearchMovieEvent() {
    const movieName = this.querySelector("input").value;
    this.dispatchEvent(
      new CustomEvent("search-movie", { bubbles: true, detail: movieName })
    );
  }
}

customElements.define("movie-search", MovieSearch);
