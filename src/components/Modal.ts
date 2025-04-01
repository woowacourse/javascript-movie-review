type ModalOptions = {
  content: string;
  onOpen?: () => void;
  onClose?: () => void;
};

const Modal = ({ content, onOpen, onClose }: ModalOptions): HTMLElement => {
  const $modalBg = document.createElement("div");
  $modalBg.classList.add("modal-background", "active");
  $modalBg.id = "modalBackground";

  let escapeListener: ((e: KeyboardEvent) => void) | null = null;

  const render = () => {
    $modalBg.innerHTML = content;
  };

  const closeModal = () => {
    onClose?.();
    $modalBg.remove();
    if (escapeListener) {
      document.removeEventListener("keydown", escapeListener);
    }
  };

  const bindEvents = () => {
    $modalBg.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.id === "closeModal") {
        closeModal();
      }
    });

    escapeListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", escapeListener);
  };

  render();
  bindEvents();
  onOpen?.();

  return $modalBg;
};

export default Modal;
