import { handleElementVisibilityByElement } from '../../util/handleHideElement';

const SKELETON_ROW_COUNT = 2;
const SKELETON_CON_COUNT_LIST = [2, 3, 4];

class SkeletonCardList {
  private skeletonCardList: Array<HTMLElement> | null;

  constructor() {
    this.skeletonCardList = null;
  }

  create(createSkeletonItem: () => HTMLElement): Array<HTMLElement> {
    const skeletonItemCount = SKELETON_ROW_COUNT * SKELETON_CON_COUNT_LIST[2];
    const skeletonItemList = new Array(skeletonItemCount).fill(0).map(() => createSkeletonItem());

    skeletonItemList.forEach((item) => document.body.append(item));

    this.skeletonCardList = skeletonItemList;

    return skeletonItemList;
  }

  handleVisibility(type: boolean) {
    this.skeletonCardList?.forEach((item) => handleElementVisibilityByElement(item, type));
  }
}

export default SkeletonCardList;
