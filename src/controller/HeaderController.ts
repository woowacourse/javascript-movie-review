import HeaderScrollManager from "../lib/scroll/headerScrollManager";
import HeaderView from "../view/HeaderView";

class HeaderController {
  #view;
  #scrollManager;

  constructor({
    onSearchKeywordSubmit,
    onHomeLogoClick,
  }: {
    onSearchKeywordSubmit: (searchValue: string) => void;
    onHomeLogoClick: () => void;
  }) {
    this.#view = new HeaderView();
    this.#scrollManager = new HeaderScrollManager();

    this.#view.bindSearchEvent(onSearchKeywordSubmit);
    this.#view.bindHomeLogoClick(onHomeLogoClick);
    this.#scrollManager.bind();
  }
}

export default HeaderController;
