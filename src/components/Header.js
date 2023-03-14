import { $ } from "../utils/Dom";

export default class Header {
  constructor() {
    this.setEvent();
  }

  setEvent() {
    const searchButton = $(".search-button");

    searchButton.addEventListener("click", () => {
      //클릭이벤트 발생시 검색
      const value = $(".search-box input").value;
    });

    searchButton.addEventListener("keydown", () => {
      //엔터이벤트 발생시 검색
    });
  }
}
