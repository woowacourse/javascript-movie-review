import { $$ } from '../utils';

export function MovieListSkeleton() {
  const template = `
    <li class="skeleton-item">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
    </li>`;

  return `${template.repeat(20)}`;
}

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}
