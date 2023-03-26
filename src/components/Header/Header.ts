import "./style.css";
import Logo from "../../images/Logo.png";

interface IHeaderProps {
  renderMovieList: (type: string, searchKeyword?: string) => void;
}

class Header {
  $target: HTMLHeadElement;
  private props: IHeaderProps;

  constructor($target: HTMLHeadElement, props: IHeaderProps) {
    this.$target = $target;
    this.props = props;

    this.render();
    this.setEvents();
  }

  template() {
    return `
  <h1 class="logo"><a><img src=${Logo} alt="MovieList 로고" /></a></h1>
  <form class="search-box">
    <div class="input-wrapper">
      <input class="search-input" type="text" placeholder="검색" />
      <div class="search-icon"></div>
    </div>
    <button class="search-button">검색</button>
  </form>
`;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  detectToCloseMobileExpandedModal() {
    const $inputWrapper = this.$target.querySelector(".input-wrapper");

    const shrinkToOriginal = () => {
      if ($inputWrapper) {
        $inputWrapper.classList.remove("expanded");
      }
      window.removeEventListener("click", handleClick);
    };

    const isChildOfInputWrapper = (element: HTMLElement) => {
      while (element) {
        if (element === $inputWrapper) {
          return true;
        }
        element = element.parentElement as HTMLElement;
      }
      return false;
    };

    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !isChildOfInputWrapper(e.target)) {
        shrinkToOriginal();
      }
    };

    window.addEventListener("click", handleClick);
  }

  setEvents() {
    const { renderMovieList } = this.props;

    const $searchBox = this.$target.querySelector(".search-box");
    const $logo = this.$target.querySelector(".logo");

    if (!$searchBox) return;

    $searchBox.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!(event.target instanceof HTMLElement)) return;

      const searchInput = event.target.querySelector(".search-input") as HTMLInputElement;

      if (!searchInput) return;

      const searchValue = searchInput.value.trim();
      renderMovieList("search", searchValue);
      searchInput.blur();

      if ($inputWrapper) {
        $inputWrapper.classList.remove("expanded");
      }
    });

    if ($logo) {
      $logo.addEventListener("click", () => {
        renderMovieList("popular");
      });
    }

    const $inputWrapper = this.$target.querySelector(".input-wrapper");
    const $searchIcon = this.$target.querySelector(".search-icon");

    if ($inputWrapper && $searchIcon) {
      $searchIcon.addEventListener("click", () => {
        $inputWrapper.classList.toggle("expanded");
        this.detectToCloseMobileExpandedModal();
      });
    }
  }
}

export default Header;
