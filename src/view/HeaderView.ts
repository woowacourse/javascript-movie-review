import { $ } from "../util/selector";

class HeaderView {
  #searchBarElement: HTMLFormElement;
  #headerLogoElement: HTMLDivElement;

  constructor() {
    this.#searchBarElement = $<HTMLFormElement>(".search-bar")!;
    this.#headerLogoElement = $<HTMLDivElement>(".header-wrapper .logo")!;
  }

  bindSearchEvent(onSearch: (searchValue: string) => void) {
    this.#searchBarElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      const formElement = event.target as HTMLElement;
      const input = $<HTMLInputElement>("input", formElement);
      const searchValue = input?.value;

      if (searchValue) {
        onSearch(searchValue);
      }
    });
  }

  bindHomeLogoClick(onClick: () => void) {
    this.#headerLogoElement.addEventListener("click", () => {
      onClick();

      const input = $<HTMLInputElement>("input", this.#searchBarElement);
      if (input) input.value = "";
    });
  }
}

export default HeaderView;
