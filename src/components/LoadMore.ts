import { ListType } from "../type/movie";
import addObserver from "../utils/IntersectionObserver";

const LoadMore = (listType: ListType, isEndPage: boolean) => {
  const $itemView = document.querySelector(".item-view");

  const $loader = document.createElement("div");
  $loader.classList.add("loader");

  for (let i = 0; i < 3; i += 1) {
    const $dot = document.createElement("div");
    $dot.classList.add("loader-dot");
    $loader.appendChild($dot);
  }

  if (!isEndPage) $itemView?.appendChild($loader);

  addObserver($loader, listType);
};
export default LoadMore;
