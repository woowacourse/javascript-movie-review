import { SHOW_MORE_THROTTLE_MS } from "../constants";
import { MovieListResponse } from "../type";
import { throttle } from "../utils";

function createShowMoreButton() {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("show-more-button");
  buttonElement.textContent = "더보기";
  return buttonElement
}

export default function renderShowMoreButton(prevResponseList: MovieListResponse[], page: number, callback: () => void) {
  if (
    prevResponseList.length &&
    prevResponseList[prevResponseList.length - 1].total_pages > page
  ) {
    if (!document.querySelector(".show-more-button")) {
      const buttonElement = createShowMoreButton();
      buttonElement.addEventListener("click", throttle(callback, SHOW_MORE_THROTTLE_MS));
      document.querySelector(".thumbnail-list")?.insertAdjacentElement("afterend", buttonElement);
    }
  } else {
    document.querySelector(".show-more-button")?.remove();
  }
}