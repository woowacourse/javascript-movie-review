export default function hideLoadMoreButton() {
  const $button = document.querySelector(".primary.more");
  if ($button) {
    $button.classList.add("disappear");
  }
}
