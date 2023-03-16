import { Header } from "./components/Header";
import { MovieList } from "./components/MovieList";
import { $ } from "./utils/selector";

export class App {
  #header;
  #movieList;

  constructor() {
    const $header = $("header");
    const $movieList = $(".item-list");

    if ($header)
      this.#header = new Header(
        $header,
        this.onSubmitSearchKeyword.bind(this),
        this.onClickLogoImage.bind(this)
      );

    if ($movieList) this.#movieList = new MovieList($movieList);
  }

  onSubmitSearchKeyword(serachKeyword: string) {
    const subTitle = $(".sub-title");

    if (subTitle) subTitle.innerHTML = `"${serachKeyword}" 검색 결과`;

    if (this.#movieList instanceof MovieList)
      this.#movieList.reset("search", serachKeyword);
  }

  onClickLogoImage() {
    const subTitle = $(".sub-title");

    if (subTitle) subTitle.innerHTML = `지금 인기 있는 영화`;
    if (this.#movieList instanceof MovieList) this.#movieList.reset("popular");
  }
}
