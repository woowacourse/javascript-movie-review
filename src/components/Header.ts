import Component from "../common/Component";
import { logo } from "../assets/image";

interface HeaderProps {
  onSearchKeywordSubmit: (searchKeyword: string) => void;
  onLogoClick: () => void;
}

class Header extends Component<HeaderProps> {
  private formElement: HTMLFormElement | null = document.querySelector<HTMLFormElement>("#search-form");

  protected getTemplate() {
    return /*html*/ `
      <h1 id="logo"><img src="${logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
          <form class="search-form">
            <input id="search-input" type="text" name="search-input" placeholder="검색"/>
            <button id="search-button" type="submit" class="search-button">검색</button>
          </form>
      </div>
    `;
  }

  private resetSearchForm() {
    this.formElement && this.formElement.reset();
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;

    document.querySelector<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      onLogoClick();
      this.resetSearchForm();
    });

    const $inputElment = document.querySelector<HTMLInputElement>("#search-input");
    const $searchForm = document.querySelector<HTMLFormElement>(".search-form");
    const $logo = document.querySelector<HTMLHeadingElement>("#logo");
    if (!$inputElment || !$searchForm || !$logo) return;
    $searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!$searchForm.classList.contains("search-form-mobile")) {
        if (!$inputElment.value) {
          alert("검색어를 입력해주세요");
          return;
        }
        onSearchKeywordSubmit($inputElment.value);
      } else if ($searchForm.classList.contains("search-form-mobile")) {
        $logo.style.display = "none";
        $searchForm.classList.remove("search-form-mobile");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth < 500) {
        $searchForm.classList.add("search-form-mobile");
      } else {
        $searchForm.classList.remove("search-form-mobile");
        $logo.style.display = "inline-block";
      }
    });
  }
}

export default Header;
