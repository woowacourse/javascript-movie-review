import "./style.css";
import createElement from "../../utils/createElement";
import DOMController from "../../DOMController";
import { $ } from "../../utils/selector";
import debounce from "../../utils/debounce";

function createSearchBox(placeHolder: string): HTMLElement {
  const searchBox = createSearchBoxElement();
  const openSearchInputButton = createOpenSearchInputButton();
  const searchForm = createSearchForm(placeHolder);
  const closeSearchInputButton = createCloseSearchInputButton();

  handleOpenSearchInputButton(
    openSearchInputButton,
    searchBox,
    closeSearchInputButton,
    searchForm
  );
  handleCloseSearchInputButton(
    closeSearchInputButton,
    searchBox,
    openSearchInputButton,
    searchForm
  );
  handleResizeEvent(
    searchBox,
    closeSearchInputButton,
    openSearchInputButton,
    searchForm
  );

  searchBox.append(openSearchInputButton, searchForm, closeSearchInputButton);
  return searchBox;
}

function createSearchBoxElement(): HTMLElement {
  return createElement({
    tagName: "div",
    attrs: {
      class: "search-box",
    },
  });
}

function createOpenSearchInputButton(): HTMLElement {
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

function createSearchForm(placeHolder: string): HTMLElement {
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

function createCloseSearchInputButton(): HTMLElement {
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

function handleOpenSearchInputButton(
  button: HTMLElement,
  searchBox: HTMLElement,
  closeButton: HTMLElement,
  form: HTMLElement
): void {
  button.addEventListener("click", () => {
    searchBox.classList.add("justify-space-between");
    closeButton.classList.add("display-block");
    button.classList.add("display-none");
    form.classList.add("display-flex");
    $("header img")?.classList.add("display-none");
  });
}

function handleCloseSearchInputButton(
  button: HTMLElement,
  searchBox: HTMLElement,
  openButton: HTMLElement,
  form: HTMLElement
): void {
  button.addEventListener("click", () => {
    searchBox.classList.remove("justify-space-between");
    button.classList.remove("display-block");
    openButton.classList.remove("display-none");
    form.classList.remove("display-flex");
    $("header img")?.classList.remove("display-none");
  });
}

function handleResizeEvent(
  searchBox: HTMLElement,
  closeButton: HTMLElement,
  openButton: HTMLElement,
  form: HTMLElement
): void {
  const debouncedResize = debounce(() => {
    if (window.innerWidth < 800) return;
    searchBox.classList.remove("justify-space-between");
    closeButton.classList.remove("display-block");
    openButton.classList.remove("display-none");
    form.classList.remove("display-flex");
    $("header img")?.classList.remove("display-none");
  }, 500);

  window.addEventListener("resize", debouncedResize);
}

export default createSearchBox;
