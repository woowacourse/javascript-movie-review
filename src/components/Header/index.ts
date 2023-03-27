import "./index.css";

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
    this.bindEvent(onSubmitSearchKeyword, onClickLogoImage);
  }

  bindEvent(
    onSubmitSearchKeyword: (searchKeyword: string) => void,
    onClickLogoImage: () => void
  ) {
    $(".search-box").addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const $searchInput = $(".search-input");

      if ($searchInput instanceof HTMLInputElement) {
        const inputValue = $searchInput.value;

        if (inputValue === "") return alert("검색값을 입력해주세요.");
        if (inputValue.trim().length === 0)
          return alert("올바른 검색어를 입력해주세요.");

        onSubmitSearchKeyword(inputValue);
      }

      if (event.target instanceof HTMLFormElement) event.target.reset();
    });

    $(".logo").addEventListener("click", onClickLogoImage);
  }

  render() {
    this.#$target.innerHTML = `
        <h1 class="logo"><img src="${logoImage}" alt="MovieList 로고" /></h1>
        <form class="search-box">
            <input class="search-input" type="search" placeholder="검색" />
            <button class="search-button">검색</button>
        </form>
    `;
  }
}
