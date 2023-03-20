export function MovieListSkeleton() {
  const template = `
    <li class="skeleton-item">
        <a href="#">
            <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
            </div>
        </a>
    </li>`;

  return `${template.repeat(20)}`;
}
