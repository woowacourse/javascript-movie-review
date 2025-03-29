import { $ } from "../utils/selectors";

const handleModalEvents = (
  $modal: HTMLDialogElement,
  closeButtonSelector: string = ".close-modal"
) => {
  if (!$modal) return;

  const closeModal = () => $modal.close();

  $modal.addEventListener("click", (event) => {
    if (event.target === $modal) {
      closeModal();
    }
  });

  const $closeButton = $(closeButtonSelector, $modal) as HTMLButtonElement;
  $closeButton?.addEventListener("click", closeModal);
};

export default handleModalEvents;
