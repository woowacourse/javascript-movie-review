const skeletonItem = (fetchId: string) => {
  return `
    <li class="skeleton-item" data-fetch-id="${fetchId}">
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>`;
};

export default skeletonItem;
