import Component from "../../common/Component";

import { $ } from "../../utils/dom";
import { logo } from "../../assets/image";

interface HeaderProps {
  onSearchKeywordSubmit: (value: string) => void;
  onLogoClick: () => void;
}

class Header extends Component<HeaderProps, {}> {
  protected getTemplate() {
    return /*html*/ `
      <h1 id="logo"><img src="${logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input id="search-input" type="text" name="search-input" placeholder="검색" required/>
        <button id="search-button" type="submit" class="search-button">검색</button>
      </div>
    `;
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;

    $<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      onLogoClick();
      this.resetSearchForm();
    });

    const $input = $<HTMLInputElement>("#search-input");

    $input?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!(e instanceof KeyboardEvent) || e.key !== "Enter") return;
      if ($input.value.trim() === "") return;

      onSearchKeywordSubmit($input.value);
    });

    $<HTMLButtonElement>("#search-button")?.addEventListener("click", () => {
      if (!$input) return;

      onSearchKeywordSubmit($input.value);
    });
  }

  private resetSearchForm() {}
}

export default Header;
