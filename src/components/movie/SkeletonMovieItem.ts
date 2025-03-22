import { createElement } from "../../utils/createElement.ts";

const SkeletonMovieItem = () => {
  return createElement(/*html*/ `
    <li class="skeleton">
      <div class="item">
        <div class="thumbnail skeleton-box"></div> 
        <div class="item-desc skeleton-box">
          <p class="rate">
            <div class="star skeleton-box"></div>
            <span class="skeleton-box rate-placeholder"></span>
          </p>
          <strong class="skeleton-box title-placeholder"></strong>
        </div>
      </div>
    </li>
  `);
};

export default SkeletonMovieItem;
