import { $ } from "../util/selector";

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
    this.searchBarElement = $<HTMLFormElement>(".search-bar")!;
    this.headerLogoElement = $<HTMLDivElement>(".header-wrapper .logo")!;

    this.bindScrollEvent();
    this.bindSearchEvent(onSearchKeywordSubmit);
    this.bindHomeLogoEvent(onHomeLogoClick);
  }

  bindScrollEvent() {
    const header = $("header")!;
    const SCROLL_THRESHOLD = 300; // 몇 픽셀 내려갔을 때 배경 줄지 설정

    window.addEventListener("scroll", () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  bindSearchEvent(onSearchKeywordSubmit: (searchValue: string) => void) {
    this.searchBarElement?.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      const formElement = event.target as HTMLElement;
      const target = $<HTMLInputElement>("input", formElement);
      const searchValue = target?.value;

      if (searchValue) {
        onSearchKeywordSubmit(searchValue);
      }
    });
  }

  bindHomeLogoEvent(onHomeLogoClick: () => void) {
    this.headerLogoElement?.addEventListener("click", () => {
      onHomeLogoClick();

      const inputElement = $<HTMLInputElement>("input", this.searchBarElement);
      if (inputElement) {
        inputElement.value = "";
      }
    });
  }
}

export default HeaderController;
