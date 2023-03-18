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
    const $searchButton = this.querySelector(".search-button") as HTMLElement;
    const $searchInput = this.querySelector("input") as HTMLElement;

    $searchButton.addEventListener("click", () => {
      this.createSearchMovieEvent();
    });

    $searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") this.createSearchMovieEvent();
    });
  }

  createSearchMovieEvent() {
    const $searchInput = this.querySelector("input") as HTMLInputElement;
    const $moreButton = $("more-button") as HTMLElement;

    if ($searchInput.value ) {
      this.dispatchEvent(
        new CustomEvent("search-movie", {
          bubbles: true,
          detail: { movieName: $searchInput.value },
        })
      );
      $moreButton.classList.add("hidden");
    }

    if (!$searchInput.value) {
      alert("검색어를 입력하시오");
    }
  }
}

customElements.define("movie-search", MovieSearch);
