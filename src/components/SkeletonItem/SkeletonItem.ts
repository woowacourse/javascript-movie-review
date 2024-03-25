const SkeletonItem = () => {
  const li = document.createElement('li');

  li.classList.add('skeleton-item');

  li.innerHTML = `
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  `;

  return li;
};

export default SkeletonItem;
