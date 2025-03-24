interface MoreMoviesButtonContract {
  setLoading(loading: boolean): void;
}

interface Props {
  refetchMovies: () => void;
}
class MoreMoviesButton implements MoreMoviesButtonContract {
  #parentElement;
  #props;
  #button: HTMLButtonElement | null = null;

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
    this.#button = this.#parentElement.querySelector(".more-movies-button");
  }

  #addEventListeners() {
    const moreButton = document.querySelector(".more-movies-button");
    moreButton?.addEventListener("click", () => this.#props.refetchMovies());
  }

  public setLoading(loading: boolean) {
    if (!this.#button) return;

    this.#button.disabled = loading;
    this.#button.textContent = loading ? "로딩 중..." : "더보기";
  }
}

export default MoreMoviesButton;
