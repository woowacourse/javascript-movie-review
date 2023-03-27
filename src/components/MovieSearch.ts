import { BREAKPOINT_SMALL } from "../constant/setting";
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
    const $homeButtom = $(".home-button") as HTMLElement;

    $searchButton.addEventListener("click", () => {
      this.createSearchMovieEvent();
    });

    $searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") this.createSearchMovieEvent();
    });

    window.addEventListener("resize", () => {
      const documentWidth = document.body.offsetWidth;
      if (documentWidth > BREAKPOINT_SMALL) {
        $searchInput.classList.remove("change");
        $homeButtom.style.display = "block";
      }
    });
  }

  createSearchMovieEvent() {
    const $searchInput = this.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    const $moreButton = $("more-button") as HTMLElement;
    const $homeButtom = $(".home-button") as HTMLElement;

    if (
      window.innerWidth < BREAKPOINT_SMALL &&
      !$searchInput.className.includes("change")
    ) {
      $searchInput.classList.add("change");
      $homeButtom.style.display = "none";
      console.log($homeButtom.style);
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
