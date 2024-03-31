import { ElementFinder } from '../../../utils';
import SkeletonInfo from '../SkeletonInfo';

const skeletonInfo = new SkeletonInfo();
// 상수
const SKELETON_LIST_CONTAINER_SELECTOR = '.skeleton-list-container';
const SKELETON_LIST_CONTAINER_EXTRA_CLASS = 'on';

const SkeletonController = {
  // skeleton list
  hideSkeletonListContainer() {
    const $skeletonListContainer = ElementFinder.findElementBySelector(
      SKELETON_LIST_CONTAINER_SELECTOR,
    );

    if (!$skeletonListContainer) return;

    SkeletonController.removeExtraClassFromSkeleton($skeletonListContainer);
  },

  removeExtraClassFromSkeleton($skeletonListContainer: HTMLElement) {
    // 초기 렌더링 시, 캐시로 인해 데이터가 빨리 불러와져서 깜빡이는 현상을 막기위해 시간을 두고 삭제
    setTimeout(
      () => {
        $skeletonListContainer.classList.remove(
          SKELETON_LIST_CONTAINER_EXTRA_CLASS,
        );
      },
      window.scrollY === 0 ? 1500 : 0,
    );
  },

  showSkeletonListContainer() {
    const $skeletonListContainer = ElementFinder.findElementBySelector(
      SKELETON_LIST_CONTAINER_SELECTOR,
    );
    if (!$skeletonListContainer) return;

    $skeletonListContainer.classList.add(SKELETON_LIST_CONTAINER_EXTRA_CLASS);
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
