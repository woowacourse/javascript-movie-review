import HeaderView from "../view/headerView";

class HeaderController {
  headerView;
  renderSearchMovieList;
  renderMovieList;

  constructor({
    renderSearchMovieList,
    renderMovieList,
  }: {
    renderSearchMovieList: (searchValue: string) => void;
    renderMovieList: () => void;
  }) {
    this.headerView = new HeaderView();
    this.renderSearchMovieList = renderSearchMovieList;
    this.renderMovieList = renderMovieList;
  }

  initialize() {
    this.bindSearchEvent();
    this.bindHomeLogoClickEvent();
    this.bindScrollEvent();
  }

  bindSearchEvent() {
    const searchBarElement = this.headerView.getSearchBarElement();

    searchBarElement.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      const searchValue = this.headerView.getInputValue();
      this.headerView.setSearchMode();
      this.renderSearchMovieList(searchValue);
      this.headerView.blurInput();
    });
  }

  bindHomeLogoClickEvent() {
    const headerLogoElement = this.headerView.getHeaderLogoElement();

    headerLogoElement?.addEventListener("click", () => {
      this.renderMovieList();
      this.headerView.clearSearchMode();
      this.headerView.clearInput();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  bindScrollEvent() {
    window.addEventListener("scroll", () => {
      this.headerView.updateScrollStyle();
    });
  }
}

export default HeaderController;
