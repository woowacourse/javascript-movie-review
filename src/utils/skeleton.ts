const getSkeletonContainer = () => {
  const skeletonContainer = document.createElement("ul");
  skeletonContainer.className = "item-list";

  skeletonContainer.innerHTML = /*html*/ `
        <li>
            <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
            </div>
        </li>
    `.repeat(20);

  return skeletonContainer;
};

export { getSkeletonContainer };
