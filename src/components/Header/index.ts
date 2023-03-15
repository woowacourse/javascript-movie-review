import logoImage from "../../../templates/logo.png";
import { $ } from "../../utils/selector";

export class Header {
  #$target;

  constructor(
    $target: Element,
    onSubmitSearchKeyword: (searchKeyword: string) => void,
    onClickLogoImage: () => void
  ) {
    this.#$target = $target;

    this.render();

    $(".search-box")?.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const $searchInput = $(".search-input");

      if ($searchInput === null) return;

      if ($searchInput instanceof HTMLInputElement)
        onSubmitSearchKeyword($searchInput.value);

      if (event.target instanceof HTMLFormElement) event.target.reset();
    });

    $(".logo")?.addEventListener("click", onClickLogoImage);
  }

  render() {
    this.#$target.innerHTML = `
        <h1 class="logo"><img src="${logoImage}" alt="MovieList 로고" /></h1>
        <form class="search-box">
            <input class="search-input" type="text" placeholder="검색" />
            <button type="submit" class="search-button">검색</button>
        </form>
    `;
  }
}
