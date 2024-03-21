import { Query } from "../../states/QueryState";

const MOVIE_ITEM_SKELETON = `
  <li>
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
  </li>
`;

export const composeMovieListSkeleton = (count: number = 20) => {
  return `
      <ul id="skeleton-movie-item-list" class="item-list">
      ${MOVIE_ITEM_SKELETON.repeat(count)}
      </ul>
  `;
};
