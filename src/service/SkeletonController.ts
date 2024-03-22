const SkeletonController = {
  hideSkeleton() {
    const $skeletonListContainer = document.querySelector(
      ".skeleton-list-container",
    ) as Element;

    $skeletonListContainer?.classList.remove("on");
    setTimeout(() => {
      $skeletonListContainer?.classList.remove("on");
    }, 500);
  },

  showSkeleton() {
    const $skeletonListContainer = document.querySelector(
      ".skeleton-list-container",
    ) as Element;

    $skeletonListContainer?.classList.add("on");
  },
};

export default SkeletonController;
