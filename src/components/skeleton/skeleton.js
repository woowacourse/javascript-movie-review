export function createSkeleton() {
  const skeleton = render();
  return skeleton;
}

function render() {
  const skeletonHTML = `            
  <li class='skeleton-list none'>
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
  </li>
  `.repeat(20);

  return skeletonHTML
}
