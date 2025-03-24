import { toElement } from "../utils/domUtils";
import Skeleton from "./Skeleton";

export default function MovieListSkeleton() {
  const $ul = document.querySelector(".thumbnail-list");

  for (let i = 0; i < 20; i++) {
    const $imageSkeleton = Skeleton({ width: 200, height: 300 });
    const $voteAverageSkeleton = Skeleton({ width: 60, height: 15 });
    const $titleSkeleton = Skeleton({ width: 150, height: 20 });

    const skeletonTemplate = /* html */ `
      <li>
        <div class="item">
          ${$imageSkeleton.outerHTML}
          <div class="item-desc">
            ${$voteAverageSkeleton.outerHTML}
            ${$titleSkeleton.outerHTML}
          </div>
        </div>
      </li>
    `;

    const $skeletonElement = toElement(skeletonTemplate);
    $ul?.append($skeletonElement);
  }
  return $ul;
}
