import { toElement } from "../../utils/toElement";

export const MovieSkeleton = () => {
  return toElement(`
      <li class="item skeleton-item">
        <div class="thumbnail skeleton-thumbnail"></div>
        <div class="item-desc">
          <p class="rate skeleton-rate"></p>
          <div class="skeleton-title"></div>
        </div>
      </li>
    `);
};
