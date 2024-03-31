import { SkeletonInfo } from '../components/skeleton';

import ElementFinder from './ElementFinder';

const skeletonInfo = new SkeletonInfo();

const SkeletonController = {
  // skeleton list container
  getSkeletonListContainer() {
    const $skeletonListContainer = ElementFinder.findElementBySelector(
      '.skeleton-list-container',
    );
    if (!$skeletonListContainer) return;

    return $skeletonListContainer;
  },

  hideSkeletonListContainer() {
    const $skeletonListContainer =
      SkeletonController.getSkeletonListContainer();

    if (!$skeletonListContainer) return;
    // 캐시로 인해  데이터가 빨리 불어져오면 스켈레톤이 바로 사라져서 깜빡이는 현상이 발생함,이를 막기 위해 setTimeout을 사용
    setTimeout(() => {
      $skeletonListContainer.classList.remove('on');
    }, 500);
  },

  showSkeletonListContainer() {
    const $skeletonListContainer =
      SkeletonController.getSkeletonListContainer();

    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.add('on');
  },
  // skeleton movie info
  showSkeletonInfo() {
    skeletonInfo.renderSkeletonInfo();
  },

  removeSkeletonInfo() {
    skeletonInfo.removeSkeletonInfo();
  },
};

export default SkeletonController;
