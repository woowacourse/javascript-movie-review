const MovieSkeleton = () => {
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

export const createSkeletons = (count: number = 10) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    fragment.appendChild(MovieSkeleton());
  }

  return fragment;
};

export default MovieSkeleton;
