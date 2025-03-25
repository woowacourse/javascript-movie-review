import { isHTMLElement } from "../utils/typeGuards";

interface Props {
  refetchMovies: () => void;
}
class MoreMoviesButton {
  #parentElement;
  #props;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#render();
    this.#addEventListeners();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
        <button class="more-movies-button">더보기</button>
    `;
  }

  #addEventListeners() {
    const moreButton = document.querySelector(".more-movies-button");
    moreButton?.addEventListener("click", () => {
      this.#disableButton();
      this.#props.refetchMovies();
      this.#enableButton();
    });
  }

  #disableButton() {
    const moreButton = document.querySelector(".more-movies-button");

    if (!isHTMLElement(moreButton)) return;

    moreButton.setAttribute("disabled", "true");
    moreButton.textContent = "로딩중...";
    moreButton.style.cursor = "not-allowed";
  }

  #enableButton() {
    const moreButton = document.querySelector(".more-movies-button");

    if (!isHTMLElement(moreButton)) return;

    moreButton?.removeAttribute("disabled");
    moreButton.textContent = "더보기";
    moreButton.style.cursor = "pointer";
  }
}

export default MoreMoviesButton;
