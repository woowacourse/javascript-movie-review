import { $$ } from '../utils';

export function MovieListSkeleton() {
  const template = `
    <li class="skeleton-item">
<<<<<<< HEAD
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
=======
        <a href="#">
            <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
            </div>
        </a>
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
    </li>`;

  return `${template.repeat(20)}`;
}

export function deleteSkeletonList() {
  const skeletonList = $$('.skeleton-item');

  skeletonList?.forEach((item) => item.remove());
}
