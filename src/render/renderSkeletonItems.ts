function createSkeletonItemTemplate(): string {
  return `
    <li class="skeleton-item item">
      <div class="skeleton thumbnail"></div>
      <div class="item-desc">
        <div class="skeleton skeleton-rate"></div>
        <div class="skeleton skeleton-title"></div>
      </div>
    </li>
  `
}

function createSkeletonItemsTemplate(count: number): string {
  return Array.from({ length: count }).map(createSkeletonItemTemplate).join("");
}

export default function renderSkeletonItems(length: number, direction: 'append' | 'prepend' = 'append') {
  const insertPosition = direction === 'append' ? 'beforeend' : 'afterbegin';
  document.querySelector(".thumbnail-list")?.insertAdjacentHTML(insertPosition, createSkeletonItemsTemplate(length));
}

export function removeSkeletonItems() {
  document.querySelectorAll(".skeleton-item").forEach((element) => element.remove());
}