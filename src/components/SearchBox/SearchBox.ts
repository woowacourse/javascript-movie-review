import "./style.css";
import createElement from "../../utils/createElement";
import DOMController from "../../DOMController";
import { $ } from "../../utils/selector";
import debounce from "../../utils/debounce";

class SearchBox {
  private searchBox: HTMLElement;
  private openSearchInputButton: HTMLElement;
  private searchForm: HTMLElement;
  private closeSearchInputButton: HTMLElement;

  constructor(placeHolder: string) {
    this.searchBox = this.createSearchBoxElement();
    this.openSearchInputButton = this.createOpenSearchInputButton();
    this.searchForm = this.createSearchForm(placeHolder);
    this.closeSearchInputButton = this.createCloseSearchInputButton();

    this.handleOpenSearchInputButton();
    this.handleCloseSearchInputButton();
    this.handleResizeEvent();

    this.searchBox.append(
      this.openSearchInputButton,
      this.searchForm,
      this.closeSearchInputButton
    );
  }

  private createSearchBoxElement(): HTMLElement {
    return createElement({
      tagName: "div",
      attrs: {
        class: "search-box",
      },
    });
  }

  private createOpenSearchInputButton(): HTMLElement {
    const button = createElement({
      tagName: "button",
      attrs: {
        class: "open-input-button",
      },
    });
    const img = createElement({
      tagName: "div",
      attrs: {
        class: "search-button-img",
      },
    });
    button.append(img);
    return button;
  }

  private createSearchForm(placeHolder: string): HTMLElement {
    const form = createElement({
      tagName: "form",
      attrs: { class: "search-form" },
    });
    const input = createElement({
      tagName: "input",
      attrs: {
        type: "text",
        placeholder: placeHolder,
      },
    }) as HTMLInputElement;
    input.required = true;
    const searchButton = createElement({
      tagName: "button",
      attrs: { class: "search-button" },
    });

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const keyword = input.value;
      DOMController.renderSearchMoviePosterBoard(keyword);
      input.textContent = "";
    });

    form.append(input, searchButton);
    return form;
  }

  private createCloseSearchInputButton(): HTMLElement {
    const button = createElement({
      tagName: "button",
      attrs: {
        class: "close-input-button",
      },
    });
    const img = createElement({
      tagName: "div",
      attrs: {
        class: "close-input-button-img",
      },
    });
    button.append(img);
    return button;
  }

  private handleOpenSearchInputButton(): void {
    this.openSearchInputButton.addEventListener("click", () => {
      this.searchBox.classList.add("justify-space-between");
      this.closeSearchInputButton.classList.add("display-block");
      this.openSearchInputButton.classList.add("display-none");
      this.searchForm.classList.add("display-flex");
      $("header img")?.classList.add("display-none");
    });
  }

  private handleCloseSearchInputButton(): void {
    this.closeSearchInputButton.addEventListener("click", () => {
      this.searchBox.classList.remove("justify-space-between");
      this.closeSearchInputButton.classList.remove("display-block");
      this.openSearchInputButton.classList.remove("display-none");
      this.searchForm.classList.remove("display-flex");
      $("header img")?.classList.remove("display-none");
    });
  }

  private handleResizeEvent(): void {
    const debouncedResize = debounce(() => {
      if (window.innerWidth < 800) return;
      this.searchBox.classList.remove("justify-space-between");
      this.closeSearchInputButton.classList.remove("display-block");
      this.openSearchInputButton.classList.remove("display-none");
      this.searchForm.classList.remove("display-flex");
      $("header img")?.classList.remove("display-none");
    }, 500);

    window.addEventListener("resize", debouncedResize);
  }

  get element() {
    return this.searchBox;
  }
}

export default SearchBox;
