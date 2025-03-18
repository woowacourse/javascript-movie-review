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
    moreButton?.addEventListener("click", () => this.#props.refetchMovies());
  }
}

export default MoreMoviesButton;
