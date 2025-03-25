import { toElement } from "../utils/domUtils";
import Skeleton from "./Skeleton";

export default function MovieListSkeleton() {
  const $ul = document.querySelector(".thumbnail-list");

  for (let i = 0; i < 20; i++) {
    const skeletonHTML = /* html */ `
      <li>
        <div class="item">
          ${Skeleton({ width: 200, height: 300 }).outerHTML}
          <div class="item-desc">
            ${Skeleton({ width: 60, height: 15 }).outerHTML}
            ${Skeleton({ width: 150, height: 20 }).outerHTML}
          </div>
        </div>
      </li>
    `;

    const $skeleton = toElement(skeletonHTML);
    $ul?.append($skeleton);
  }
  return $ul;
}
