import "./header-skeleton.css";

function HeaderSkeleton() {
  const $headerSkeletonContainer = document.createElement("header");

  $headerSkeletonContainer.innerHTML = `
  <div class="background-container skeleton-background">
    <div class="overlay skeleton-overlay" aria-hidden="true">  
    </div>
    <div class="banner skeleton-banner"></div>
    <div class="top-rated-container">
      <div class="top-rated-movie">
        <div class="rate skeleton-rate">
          <div class="skeleton-star"></div>
          <div class="skeleton-rate-value"></div>
        </div>
        <div class="title skeleton-title"></div>
        <div class="primary detail skeleton-button"></div>
      </div>
    </div>
  </div>
  `;

  return $headerSkeletonContainer;
}

export default HeaderSkeleton;
