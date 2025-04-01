export function closeModal() {
  const modalBackground = document.querySelector(".modal-background");
  const $wrap = document.querySelector("#wrap");
  if (!modalBackground) return;

  document.body.classList.remove("modal-open");
  $wrap?.removeChild(modalBackground);

  document.body.removeEventListener("keydown", handleEscape);
}

export function preventScrollWhenModalOpen() {
  document.body.classList.add("modal-open");
}
