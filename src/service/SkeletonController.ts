import { renderAlertModalForNullEl } from './AlertModalForNullController';

const SkeletonController = {
  getSkeletonElement() {
    const $skeletonListContainer = document.querySelector(
      '.skeleton-list-container',
    );
    if (!$skeletonListContainer) {
      renderAlertModalForNullEl('skeleton');
      return;
    }
    return $skeletonListContainer;
  },

  hideSkeleton() {
    const $skeletonListContainer = SkeletonController.getSkeletonElement();
    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.remove('on');
    setTimeout(() => {
      $skeletonListContainer.classList.remove('on');
    }, 500);
  },

  showSkeleton() {
    const $skeletonListContainer = SkeletonController.getSkeletonElement();
    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.add('on');
  },
};

export default SkeletonController;
