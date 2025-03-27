const SkeletonBanner = (): string => {
  return /* html */ `
    <div id="banner" class="background-container skeleton-banner">
      <div class="overlay" aria-hidden="true"></div>
      <div class="skeleton-banner-content">
      </div>
    </div>
  `;
};

export default SkeletonBanner;
