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
      <input class="search-input" type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>
  `;
  }

  render() {
    this.$target.innerHTML = this.template();
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

      const searchValue = searchInput.value;
      renderMovieList("search", searchValue);
      searchInput.blur();
    });

    if ($logo) {
      $logo.addEventListener("click", () => {
        renderMovieList("popular");
      });
    }
  }
}

export default Header;
