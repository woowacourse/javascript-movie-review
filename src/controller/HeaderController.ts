class HeaderController {
  searchBarElement;
  headerLogoElement;

  constructor({
    onSearchKeywordSubmit,
    onHomeLogoClick,
  }: {
    onSearchKeywordSubmit: (searchValue: string) => void;
    onHomeLogoClick: () => void;
  }) {
    this.searchBarElement = document.querySelector(
      ".search-bar",
    ) as HTMLFormElement;
    this.headerLogoElement = document.querySelector(
      ".header-wrapper .logo",
    ) as HTMLDivElement;

    this.bindSearchEvent(onSearchKeywordSubmit);
    this.bindHomeLogoEvent(onHomeLogoClick);
  }

  bindSearchEvent(onSearchKeywordSubmit: (searchValue: string) => void) {
    this.searchBarElement.addEventListener(
      "submit",
      async (event: SubmitEvent) => {
        event.preventDefault();

        const formElement = event.target as HTMLElement;
        const target = formElement.querySelector("input") as HTMLInputElement;
        const searchValue = target.value;

        onSearchKeywordSubmit(searchValue);
      },
    );
  }

  bindHomeLogoEvent(onHomeLogoClick: () => void) {
    this.headerLogoElement?.addEventListener("click", () => {
      onHomeLogoClick();

      const inputElement = this.searchBarElement.querySelector(
        "input",
      ) as HTMLInputElement;
      inputElement.value = "";
    });
  }
}

export default HeaderController;
