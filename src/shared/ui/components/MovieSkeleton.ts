export const MovieSkeleton = () => {
  const skeletonItem = document.createElement("li");

  skeletonItem.innerHTML = /*html*/ `
      <div class="item skeleton-item">
        <div class="thumbnail skeleton-thumbnail"></div>
        <div class="item-desc">
          <p class="rate skeleton-rate"></p>
          <div class="skeleton-title"></div>
        </div>
      </div>
    `;

  return skeletonItem;
};
