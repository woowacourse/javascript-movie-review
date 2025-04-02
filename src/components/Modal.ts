type ModalOptions = {
  content: string;
  onOpen?: () => void;
  onClose?: () => void;
};

const Modal = ({ content, onOpen, onClose }: ModalOptions): HTMLElement => {
  const $modalBg = document.createElement("div");
  $modalBg.classList.add("modal-background", "active");
  $modalBg.id = "modalBackground";

  const render = () => {
    $modalBg.innerHTML = content;
  };

  const closeModal = () => {
    onClose?.();
    $modalBg.remove();
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("click", handleCloseClick);
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  const handleCloseClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.className === "closeModal") closeModal();
  };

  const bindCloseEvents = () => {
    document.addEventListener("click", handleCloseClick);
    document.addEventListener("keydown", handleEscapeKey);
  };

  render();
  bindCloseEvents();
  onOpen?.();

  return $modalBg;
};

export default Modal;
