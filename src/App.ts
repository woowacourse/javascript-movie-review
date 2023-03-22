import { Header } from "./components/Header";
import { MovieList } from "./components/MovieList";
import { Movie } from "./types";
import { $ } from "./utils/selector";

export class App {
  #header;
  #movieList;

  constructor() {
    const $header = $("header");
    const $movieList = $(".item-list");

    this.#header = new Header(
      $header,
      this.onSubmitSearchKeyword.bind(this),
      this.onClickLogoImage.bind(this)
    );

    this.#movieList = new MovieList($movieList);

    this.bindEvent();
  }

  bindEvent() {
    window.addEventListener("popstate", () => {
      const selectedMovieId = Number(window.location.hash.replace("#", ""));

      this.#movieList.getMovieInfo(
        selectedMovieId,
        this.onClickMovieCard.bind(this)
      );
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

  onClickMovieCard(movie: Movie) {
    console.log(movie);
  }
}
