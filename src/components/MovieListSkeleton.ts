import Skeleton from "./Skeleton";

export default function MovieListSkeleton() {
  const $movieListSkeleton = document.querySelector(".thumbnail-list");

  for (let i = 0; i < 20; i++) {
    const $li = document.createElement("li");
    const $item = document.createElement("div");
    $item.className = "item";

    const $imageSkeleton = Skeleton({ width: 200, height: 300 });
    const $voteAverageSkeleton = Skeleton({ width: 60, height: 15 });
    const $titleSkeleton = Skeleton({ width: 150, height: 20 });

    const $itemDesc = document.createElement("div");
    $itemDesc.className = "item-desc";

    $itemDesc.append($voteAverageSkeleton, $titleSkeleton);
    $item.append($imageSkeleton);
    $item.append($itemDesc);

    $li.append($item);
    $movieListSkeleton?.append($li);
  }
  return $movieListSkeleton;
}
