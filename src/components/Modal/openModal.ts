import { ModalContent } from "../../../types/movieType";
import { Star } from "../Star/Star";
import { Modal } from "./Modal";

function openModal({
  title,
  release_date,
  genres,
  poster_path,
  vote_average,
  overview,
}: ModalContent) {
  const $modalContainer = document.createElement("div");
  $modalContainer.classList.add("modalcontainer");

  const modalElement = Modal({
    title,
    release_date,
    genres,
    poster_path,
    vote_average,
    overview,
  });
  $modalContainer.innerHTML = modalElement;

  const starComponent = Star({
    $modalContainer,
    title,
  });

  document.body.appendChild($modalContainer);

  const closeButton = $modalContainer.querySelector("#closeModal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      starComponent.cleanup();
      $modalContainer.remove();
    });
  }

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && $modalContainer) {
      starComponent.cleanup();
      $modalContainer.remove();
    }
  });

  const $modalOverlay = $modalContainer.querySelector("#modalBackground");
  if ($modalOverlay) {
    $modalOverlay.addEventListener("click", () => {
      starComponent.cleanup();
      $modalContainer.remove();
    });
  }
}

export default openModal;
