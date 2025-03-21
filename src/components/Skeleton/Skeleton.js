import "./skeleton.css";

function Skeleton() {
  const $skeletonContainer = document.createElement("li");
  $skeletonContainer.classList.add("skeletonContainer");

  $skeletonContainer.innerHTML = `
    <div class="skeletonItem">
      <div class="skeleton-image"></div>
      <div class="skeleton-caption"></div>
    </div>
  `;
  return $skeletonContainer;
}

export default Skeleton;
