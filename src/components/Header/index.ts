import "./index.css";

import logoImage from "../../../templates/logo.png";

import { $ } from "../../utils/selector";

export class Header {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    this.render();
    this.bindEvent();
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

  bindEvent() {
    const $searchInput = $(".search-input");

    if (!($searchInput instanceof HTMLInputElement)) return;

    $searchInput.addEventListener("click", function () {
      this.select();
    });
  }

  getInputValue() {
    const $searchInput = $(".search-input");

    if (!($searchInput instanceof HTMLInputElement))
      throw new Error("입력창이 존재하지 않습니다.");

    return $searchInput.value;
  }
}
