import { $ } from "../utils/Dom";

export default class MovieSearch extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
         <div class="search-box">
          <input class="search-input" type="text" placeholder="검색" />
          <button class="search-button">검색</button>
         </div>
        `;
  }

  setEvent() {
    const $searchButton = this.querySelector(".search-button") as HTMLElement;
    const $searchInput = this.querySelector("input") as HTMLElement;

    $searchButton.addEventListener("click", () => {
      this.createSearchMovieEvent();
    });

    $searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") this.createSearchMovieEvent();
    });
  }

  createSearchMovieEvent() {
    const $searchInput = this.querySelector("input") as HTMLInputElement;
    const $moreButton = $("more-button") as HTMLElement;
    const $homeButtom = $(".home-button") as HTMLElement;

    if (window.innerWidth < 410 && !$searchInput.className.includes("change")) {
      $searchInput.classList.add("change");
      $homeButtom.style.display = "none";
      return;
    }

    this.dispatchEvent(
      new CustomEvent("search-movie", {
        bubbles: true,
        detail: { movieName: $searchInput.value },
      })
    );
    $moreButton?.classList.add("hidden");

    $searchInput.classList.remove("change");
    $homeButtom.style.display = "block";
  }
}

customElements.define("movie-search", MovieSearch);
