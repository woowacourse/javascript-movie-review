import Component from "../../common/Component";

import { $ } from "../../utils/dom";
import { logo } from "../../assets/image";

interface HeaderProps {
  onSearchKeywordSubmit: (value: string) => void;
  onLogoClick: () => void;
}

class Header extends Component<HeaderProps, {}> {
  private $form: HTMLFormElement | undefined;

  protected getTemplate() {
    return /*html*/ `
      <h1 id="logo"><img src="${logo}" alt="MovieList 로고" /></h1>
      <form class="search-box" id="movie-search-form">
        <input id="search-input" type="text" name="search-input" placeholder="검색" required/>
        <button id="search-button" type="submit" class="search-button">검색</button>
      </form>
    `;
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();

    const searchForm = $<HTMLFormElement>("#movie-search-form");
    if (!searchForm) return;

    this.$form = searchForm;
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;

    $<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      onLogoClick();
      this.resetSearchForm();
    });

    this.$form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const $input = $<HTMLInputElement>("#search-input");
      if (!$input) return;

      onSearchKeywordSubmit($input.value);
      this.resetSearchForm();
    });
  }

  private resetSearchForm() {
    if (!this.$form) return;

    this.$form.reset();
  }
}

export default Header;
