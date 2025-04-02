class HeaderView {
  headerElement;
  searchBarElement;
  logoElement;
  inputElement;

  constructor() {
    this.headerElement = document.querySelector(".header-wrapper") as HTMLElement;
    this.searchBarElement = this.headerElement.querySelector(".search-bar") as HTMLFormElement;
    this.logoElement = this.headerElement.querySelector(".logo") as HTMLElement;
    this.inputElement = this.searchBarElement.querySelector("input") as HTMLInputElement;
  }
  getSearchBarElement() {
    return document.querySelector(".search-bar") as HTMLElement;
  }

  getHeaderLogoElement() {
    return document.querySelector(".header-wrapper .logo") as HTMLElement;
  }

  getInputValue() {
    return this.inputElement.value;
  }

  blurInput() {
    this.inputElement.blur();
  }

  clearInput() {
    this.inputElement.value = "";
  }

  setSearchMode() {
    const backgroundElement = document.querySelector(".background-container") as HTMLElement;
    backgroundElement?.classList.add("search");
  }

  clearSearchMode() {
    const backgroundElement = document.querySelector(".background-container") as HTMLElement;
    backgroundElement?.classList.remove("search");
  }

  updateScrollStyle() {
    if (window.scrollY > 200) {
      this.headerElement.classList.add("scroll");
    } else {
      this.headerElement.classList.remove("scroll");
    }
  }
}

export default HeaderView;
