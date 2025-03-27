import { MovieInfo } from "../../../types/movieType";
import { Modal } from "./Modal";

function openModal({
  title,
  genres,
  poster_path,
  vote_average,
  overview,
}: MovieInfo) {
  const $modalContainer = document.createElement("div");
  $modalContainer.classList.add("modalcontainer");

  const modalElement = Modal({
    title,
    genres,
    poster_path,
    vote_average,
    overview,
  });
  $modalContainer.innerHTML = modalElement;
  document.body.appendChild($modalContainer);

  const closeButton = $modalContainer.querySelector("#closeModal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      $modalContainer.remove();
    });
  }

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && $modalContainer) {
      $modalContainer.remove();
    }
  });

  const $modalOverlay = $modalContainer.querySelector("#modalBackground");
  if ($modalOverlay) {
    $modalOverlay.addEventListener("click", () => {
      $modalContainer.remove();
    });
  }
}

export default openModal;
