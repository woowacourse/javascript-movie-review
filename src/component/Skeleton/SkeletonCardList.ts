const SKELETON_ROW_COUNT = 2;
const SKELETON_CON_COUNT_LIST = [2, 3, 4];

function createSkeletonCardList(createSkeletonItem: () => HTMLElement): Array<HTMLElement> {
  const skeletonItemCount = SKELETON_ROW_COUNT * SKELETON_CON_COUNT_LIST[2];
  const skeletonItemList = new Array(skeletonItemCount).fill(0).map(() => createSkeletonItem());

  skeletonItemList.forEach((item) => document.body.append(item));

  return skeletonItemList;
}

export default createSkeletonCardList;
