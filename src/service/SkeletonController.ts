import { renderAlertModalForNullEl } from './AlertModalForNullController';

const SkeletonController = {
  // skeleton list container
  getSkeletonListContainer() {
    const $skeletonListContainer = document.querySelector(
      '.skeleton-list-container',
    );
    if (!$skeletonListContainer) {
      renderAlertModalForNullEl('skeleton');
      return;
    }
    return $skeletonListContainer;
  },

  hideSkeletonListContainer() {
    const $skeletonListContainer =
      SkeletonController.getSkeletonListContainer();
    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.remove('on');
    setTimeout(() => {
      $skeletonListContainer.classList.remove('on');
    }, 500);
  },

  showListSkeletonContainer() {
    const $skeletonListContainer =
      SkeletonController.getSkeletonListContainer();
    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.add('on');
  },
  // skeleton movie info
};

export default SkeletonController;
