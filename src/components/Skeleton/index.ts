export const getSkeletonContainer = () => {
  const skeletonContainer = document.createElement("ul");
  skeletonContainer.className = "item-list";
  /*html*/
  skeletonContainer.innerHTML = `
        <li>
            <a href="#">
            <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
            </div>
            </a>
        </li>
    `.repeat(20);

  return skeletonContainer;
};
