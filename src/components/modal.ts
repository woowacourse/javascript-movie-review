interface ModalInstance {
  element: HTMLElement;
  open: () => void;
  close: () => void;
}

export function createModal(): ModalInstance {
  const element = document.createElement("div");
  element.className = "modal";
  element.setAttribute("aria-hidden", "true");

  const open = () => {
    element.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    element.setAttribute("aria-hidden", "true");
  };

  element.addEventListener("click", (e) => {
    if (e.target === element) close();
  });

  return { element, open, close };
}
