import skeletonContainer from "../skeletonContainer";
import skeletonContainerTitle from "../skeletonTitleContainer";

const showSkeletonContainer = (
  $targetElement: Element | null,
  hasSkeletonTitle = false
) => {
  if (!$targetElement) {
    return;
  }

  const $skeleton = skeletonContainer(20);
  if (hasSkeletonTitle) {
    $skeleton.prepend(skeletonContainerTitle());
  }
  $targetElement.append($skeleton);
};

export default showSkeletonContainer;
