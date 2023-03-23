import CustomComponent from "../abstracts/CustomComponent";
import LogoImg from "../../templates/logo.png";
import { ACTION } from "../constants/constants";

export default class HeaderComponent extends CustomComponent {
  render() {
    super.render();

    this.logo = this.querySelector(".header-logo");
    this.buttonWrapper = this.querySelector(".search-button-wrapper");
    this.searchBox = this.querySelector(".search-box");
    this.hideAll = this.querySelector(".hide-all");
  }
  hideSearch() {
    if (this.logo.style.display === "none") {
      this.buttonWrapper.style.display = "flex";
      this.searchBox.style.display = "none";
      this.logo.style.display = "block";
      this.hideAll.style.display = "none";
    }
  }

  searchOn() {
    this.buttonWrapper.style.display = "none";
    this.searchBox.style.display = "flex";
    this.logo.style.display = "none";
    this.hideAll.style.display = "block";
  }

  handleEvent() {
    this.addEventListener("click", (e) => {
      switch (e.target.dataset.action) {
        case ACTION.SEARCH:
          const inputElement = this.querySelector("input");
          if (inputElement.style.display === "none") {
            inputElement.style.display = "block";
          }
          this.hideSearch();
          break;
        case ACTION.HIDE_SEARCH:
          this.hideSearch();
          break;
        case ACTION.ON_SEARCH:
          this.searchOn();
          break;
      }
    });
  }

  template() {
    return /*html*/ `
          <h1 class="header-logo"><img src=${LogoImg} alt="MovieList 로고" data-action='popular'/></h1>
          <div class="search-box">
            <input type="text" placeholder="검색" />
            <button class="search-button" data-action="search">검색</button>
          </div>
          <button type="button" class="search-button-wrapper" data-action="search_on">
            검색
          </button>
          <div class="hide-all" data-action="hide_search"></div>
        `;
  }
}

customElements.define("app-header", HeaderComponent);
