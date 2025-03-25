import { $ } from "../utils/selectors";

const hideSkeletonContainer = () => {
  const $skeleton = $(".skeleton-container");
  if (!$skeleton) {
    return;
  }

  $skeleton.remove();
};

export default hideSkeletonContainer;
