export default function removeSkeletonItems() {
  document.querySelectorAll(".skeleton-item").forEach((element) => element.remove());
}