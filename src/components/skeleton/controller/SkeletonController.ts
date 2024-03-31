import { ElementFinder } from '../../../utils';
import SkeletonInfo from '../SkeletonInfo';

const skeletonInfo = new SkeletonInfo();

const SkeletonController = {
  hideSkeletonListContainer() {
    const $skeletonListContainer = ElementFinder.findElementBySelector(
      '.skeleton-list-container',
    );

    if (!$skeletonListContainer) return;
    // 초기 렌더링 시, 캐시로 인해 데이터가 빨리 불러와져서 깜빡이는 현상을 막기위해 시간을 두고 삭제
    setTimeout(
      () => {
        $skeletonListContainer.classList.remove('on');
      },
      window.scrollY === 0 ? 1500 : 0,
    );
  },

  showSkeletonListContainer() {
    const $skeletonListContainer = ElementFinder.findElementBySelector(
      '.skeleton-list-container',
    );
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
