import { toElement } from "../utils/domUtils";
import Skeleton from "./Skeleton";

export default function MovieListSkeleton() {
  const $movieListFragment = document.createDocumentFragment();

  for (let i = 0; i < 20; i++) {
    const $movieItem = toElement(`
      <li>
        <div class="item">
          ${Skeleton({ width: "200px", height: "300px" })}
          <div class="item-desc">
            ${Skeleton({ width: "60px", height: "15px" })}
            ${Skeleton({ width: "150px", height: "20px" })}
          </div>
        </div>
      </li>
      `);
    $movieListFragment.appendChild($movieItem);
  }

  return $movieListFragment;
}
