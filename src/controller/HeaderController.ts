class HeaderController {
  searchBarElement;
  headerLogoElement;
  constructor({
    renderSearchMovieList,
    renderMovieList,
  }: {
    renderSearchMovieList: (searchValue: string) => void;
    renderMovieList: () => void;
  }) {
    this.searchBarElement = document.querySelector(".search-bar") as HTMLFormElement;
    this.headerLogoElement = document.querySelector(".header-wrapper .logo") as HTMLDivElement;

    this.bindSearchEvent(renderSearchMovieList);
    this.bindHomeLogoEvent(renderMovieList);
    this.bindScrollEvent();
  }

  bindSearchEvent(renderSearchMovieList: (searchValue: string) => void) {
    this.searchBarElement.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      const formElement = event.target as HTMLElement;
      const target = formElement.querySelector("input") as HTMLInputElement;
      const searchValue = target.value;

      document.querySelector(".background-container")?.classList.add("search");

      renderSearchMovieList(searchValue);

      target.blur();
    });
  }

  bindHomeLogoEvent(renderMovieList: () => void) {
    this.headerLogoElement?.addEventListener("click", () => {
      renderMovieList();
      document.querySelector(".background-container")?.classList.remove("search");

      const inputElement = this.searchBarElement.querySelector("input") as HTMLInputElement;
      inputElement.value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  bindScrollEvent() {
    window.addEventListener("scroll", () => {
      const headerElement = document.querySelector(".header-wrapper") as HTMLElement;

      if (window.scrollY > 200) {
        headerElement.classList.add("scroll");
      } else {
        headerElement.classList.remove("scroll");
      }
    });
  }
}

export default HeaderController;
