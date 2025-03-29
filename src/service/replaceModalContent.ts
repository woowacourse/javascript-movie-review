export default function replaceModalContent($newContent: HTMLElement) {
  const $modal = document.querySelector(".modal");
  if (!$modal) return;

  const $closeButton = $modal.querySelector("#closeModal");
  $modal.innerHTML = "";
  if ($closeButton) $modal.appendChild($closeButton);

  $modal.appendChild($newContent);
}
