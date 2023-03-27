import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { MovieDetail } from "./components/MovieDetail";
import { MovieList } from "./components/MovieList";
import { $ } from "./utils/selector";

class App {
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

    this.#movieList = new MovieList($movieList, this.onClickMovie.bind(this));
    this.#modal = new Modal($modal);
  }

  onSubmitSearchKeyword(serachKeyword: string) {
    const subTitle = $(".sub-title");
    subTitle.innerHTML = `"${serachKeyword}" 검색 결과`;

    if (this.#movieList instanceof MovieList)
      this.#movieList.reset("search", serachKeyword);
  }

  onClickLogoImage() {
    const subTitle = $(".sub-title");
    subTitle.innerHTML = `지금 인기 있는 영화`;

    if (this.#movieList instanceof MovieList) this.#movieList.reset("popular");
  }

  onClickMovie(movieId: number) {
    this.#modal.renderMovieDetail(movieId);
  }
}

export { App };
