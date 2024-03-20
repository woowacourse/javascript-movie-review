import Component from "../common/Component";
import { $ } from "../utils/dom";
import { logo } from "../assets/image";

interface HeaderProps {
  onSearchKeywordSubmit: (searchKeyword: string) => void;
  onLogoClick: () => void;
}

class Header extends Component<HTMLDivElement, HeaderProps> {
  protected getTemplate() {
    return /*html*/ `
    <h1 id="logo"><img src="${logo}" alt="MovieList 로고" /></h1>
    <div class="search-box">
      <form id="search-form">
        <input id="search-input" type="text" name="search-input" placeholder="검색" />
        <button id="search-button" type="submit" class="search-button">검색</button>
      </form>
    </div>
    `;
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;

    $<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      // e.preventDefault();
      onLogoClick();
    });

    const formElement = $<HTMLFormElement>("#search-form");

    formElement?.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(formElement);
      onSearchKeywordSubmit(formData.get("search-input") as string);
    });
  }
}

export default Header;
