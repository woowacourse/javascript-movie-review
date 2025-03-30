export function closeModal() {
  const modalBackground = document.querySelector(".modal-background");
  if (!modalBackground) return;

  document.body.removeChild(modalBackground);
}
