const EscapeModal = (
  modal: HTMLElement,
  handler: (this: Document, ev: KeyboardEvent) => any,
  event?: KeyboardEvent,
  keyboardInput?: string,
) => {
  if ((event && event.key === keyboardInput) || (!event && !keyboardInput)) {
    document.removeEventListener('keydown', handler);
    modal.remove();
    document.body.style.overflow = 'auto';
  }
};

export default EscapeModal;
