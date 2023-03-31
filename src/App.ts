import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { MovieList } from "./components/MovieList";
import { $ } from "./utils/selector";

export class App {
  #header;
  #movieList;
  #modal;

  constructor() {
    const $header = $("header");
    const $movieList = $(".item-list");
    const $modal = $(".modal-content");

    this.#header = new Header($header);

    this.#movieList = new MovieList($movieList);

    this.#modal = new Modal($modal);

    this.bindEvent($movieList, $header);
  }

  bindEvent($movieList: Element, $header: Element) {
    $movieList.addEventListener("click", ({ target }) => {
      if (!(target instanceof HTMLElement)) return;

      const movieCard = target.closest("li");
      const movieId = movieCard?.dataset.movieId;

      if (movieId) this.onClickMovieCard(Number(movieId));
    });

    $header.addEventListener("click", ({ target }) => {
      if (!(target instanceof HTMLImageElement)) return;

      this.onClickLogoImage();
    });

    $header.addEventListener("submit", (event) => {
      event.preventDefault();

      this.onSubmitSearchKeyword(this.#header.getInputValue());
    });
  }

  onSubmitSearchKeyword(serachKeyword: string) {
    const subTitle = $(".sub-title");

    if (serachKeyword === "") return alert("검색값을 입력해주세요.");
    if (serachKeyword.trim().length === 0)
      return alert("올바른 검색어를 입력해주세요.");

    subTitle.innerHTML = `"${serachKeyword}" 검색 결과`;

    if (this.#movieList instanceof MovieList)
      this.#movieList.changeShowTarget("search", serachKeyword);
  }

  onClickLogoImage() {
    const subTitle = $(".sub-title");

    subTitle.innerHTML = `지금 인기 있는 영화`;

    if (this.#movieList instanceof MovieList)
      this.#movieList.changeShowTarget("popular");
  }

  onClickMovieCard(movieId: number) {
    this.#modal.open("movieDetail", movieId);
  }
}
