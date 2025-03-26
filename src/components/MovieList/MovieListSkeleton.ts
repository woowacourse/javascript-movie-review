import { Skeleton } from "../index";

const SKELETON_COUNT = 20;

export default function MovieListSkeleton() {
  const $ul = document.querySelector(".thumbnail-list");

  for (let i = 0; i < SKELETON_COUNT; i++) {
    const $li = document.createElement("li");

    const $imageSkeleton = Skeleton({ width: 200, height: 300 }).outerHTML;
    const $voteAverageSkeleton = Skeleton({ width: 60, height: 15 }).outerHTML;
    const $titleSkeleton = Skeleton({ width: 150, height: 20 }).outerHTML;

    $li.innerHTML = /* html */ `
      <div class="item">
        ${$imageSkeleton}
        <div class="item-desc">
          ${$voteAverageSkeleton}
          ${$titleSkeleton}
        </div> 
      </div> 
    `;

    $ul?.append($li);
  }
  return $ul;
}
