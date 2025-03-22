import { MOVIE_ITEM_PER_PAGE } from "../constants";
import { $, createElement } from "../utils";
import Skeleton from "./Skeleton";

export default function MovieListSkeleton() {
  const $movieListSkeleton = $(".thumbnail-list");

  for (let i = 0; i < MOVIE_ITEM_PER_PAGE; i++) {
    const $li = createElement(`
      <li>
        <div class="item">
          <div class="item-desc"></div>
        </div>
      </li>
    `);

    const $imageSkeleton = Skeleton({ width: 200, height: 300 });
    const $voteAverageSkeleton = Skeleton({ width: 60, height: 15 });
    const $titleSkeleton = Skeleton({ width: 150, height: 20 });

    $li.querySelector(".item")?.append($imageSkeleton);
    $li
      .querySelector(".item-desc")
      ?.append($voteAverageSkeleton, $titleSkeleton);
    $movieListSkeleton?.append($li);
  }
  return $movieListSkeleton;
}
