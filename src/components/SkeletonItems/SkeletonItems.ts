const SkeletonItems = () => {
  const skeletonContainer = document.createElement('ul');

  skeletonContainer.classList.add('skeleton-list', 'hide-skeleton', 'grid');
  skeletonContainer.setAttribute('id', 'skeleton-container');

  Array.from({ length: 20 }, () => {
    const li = document.createElement('li');

    li.classList.add('skeleton-item');

    li.innerHTML = `
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  `;

    skeletonContainer.appendChild(li);
  });

  return skeletonContainer;
};

export default SkeletonItems;
