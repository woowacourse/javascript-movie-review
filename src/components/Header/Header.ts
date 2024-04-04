import Component from "../common/Component";

import { $, isMobileDevice } from "../../utils/dom";
import { logo } from "../../assets/image";

import "./Header.css";
import { Optional } from "../../types/utility";

interface HeaderProps {
  onSearchKeywordSubmit: (value: string) => void;
  onLogoClick: () => void;
}

class Header extends Component<HeaderProps, {}> {
  private $form: Optional<HTMLFormElement>;

  private $input: Optional<HTMLInputElement>;

  private $h1: Optional<HTMLHeadingElement>;

  protected getTemplate() {
    return /*html*/ `
      <h1 id="logo" class="font-bold cursor-pointer"><img src="${logo}" alt="MovieList 로고" /></h1>
      <form class="flex justify-between align-center search-form" id="movie-search-form">
        <input id="search-input" class="text-base border-0 rounded-lg" type="text" name="search-input" placeholder="검색"/>
        <button id="search-button" class="border-0 search-button" type="submit" ></button>
      </form>
    `;
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();

    const $form = $<HTMLFormElement>("#movie-search-form");
    const $input = $<HTMLInputElement>("#search-input");
    const $h1 = $<HTMLHeadingElement>("#logo");

    if (!$form || !$input || !$h1) return;

    this.$form = $form;
    this.$input = $input;
    this.$h1 = $h1;
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;

    $<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      onLogoClick();

      this.resetSearchForm();
    });

    $<HTMLButtonElement>("#search-button")?.addEventListener("click", (event: Event) => {
      if (!isMobileDevice() || !this.isInputWidthZero()) return;

      this.addMobileFormStyle();

      this.$input?.focus();
    });

    this.$form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      if (!this.$input || !this.inValidSearchInput()) return;

      onSearchKeywordSubmit(this.$input?.value);

      this.resetSearchForm();
    });

    document.addEventListener("click", (event: Event) => {
      if (!isMobileDevice()) return;

      const eventTarget = event.target;
      if (!(eventTarget instanceof HTMLElement) || eventTarget.closest("#movie-search-form")) return;

      this.removeMobileFormStyle();
    });

    window.addEventListener("resize", () => {
      if (isMobileDevice()) return;

      this.removeMobileFormStyle();
    });
  }

  private inValidSearchInput() {
    if (!this.$input) return;

    return this.$input.value.trim().length !== 0;
  }

  private isInputWidthZero() {
    return this.$input?.offsetWidth === 0;
  }

  private renderMovieListLogo() {
    this.$h1?.classList.remove("hidden");
  }

  private hideMovieListLogo() {
    this.$h1?.classList.add("hidden");
  }

  private addMobileFormStyle() {
    this.hideMovieListLogo();

    this.$form?.classList.add("full-width-important");

    this.$input?.classList.add("mobile-search-input");
  }

  private removeMobileFormStyle() {
    this.renderMovieListLogo();

    this.$form?.classList.remove("full-width-important");

    this.$input?.classList.remove("mobile-search-input");
  }

  private resetSearchForm() {
    if (!this.$form) return;

    this.$form.reset();
  }
}

export default Header;
