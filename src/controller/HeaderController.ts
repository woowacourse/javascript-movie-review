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
    this.searchBarElement = document.querySelector(
      ".search-bar",
    ) as HTMLFormElement;
    this.headerLogoElement = document.querySelector(
      ".header-wrapper .logo",
    ) as HTMLDivElement;

    this.bindSearchEvent(renderSearchMovieList);
    this.bindHomeLogoEvent(renderMovieList);
  }

  bindSearchEvent(renderSearchMovieList: (searchValue: string) => void) {
    this.searchBarElement.addEventListener(
      "submit",
      async (event: SubmitEvent) => {
        event.preventDefault();

        const formElement = event.target as HTMLElement;
        const target = formElement.querySelector("input") as HTMLInputElement;
        const searchValue = target.value;

        renderSearchMovieList(searchValue);
      },
    );
  }

  bindHomeLogoEvent(renderMovieList: () => void) {
    this.headerLogoElement?.addEventListener("click", () => {
      renderMovieList();

      const inputElement = this.searchBarElement.querySelector(
        "input",
      ) as HTMLInputElement;
      inputElement.value = "";
    });
  }
}

export default HeaderController;
