import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { MovieList } from "./components/MovieList";
import { Movie } from "./types";
import { $ } from "./utils/selector";

export class App {
  #header;
  #movieList;
  #modal;

  constructor() {
    const $header = $("header");
    const $movieList = $(".item-list");
    const $modal = $(".modal");

    this.#header = new Header(
      $header,
      this.onSubmitSearchKeyword.bind(this),
      this.onClickLogoImage.bind(this)
    );

    this.#movieList = new MovieList($movieList);

    this.#modal = new Modal($modal);

    this.bindEvent();
  }

  bindEvent() {
    window.addEventListener("popstate", () => {
      const hashString = window.location.hash.replace("#", "");
      const selectedMovieId = Number(hashString);

      if (hashString !== "") {
        this.onClickMovieCard(selectedMovieId);
        return;
      }

      this.#modal.close();
    });
  }

  onSubmitSearchKeyword(serachKeyword: string) {
    const subTitle = $(".sub-title");

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
    this.#modal.open(movieId);
  }
}
