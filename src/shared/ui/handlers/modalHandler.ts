export function closeModal() {
  const modalBackground = document.querySelector(".modal-background");
  const $wrap = document.querySelector("#wrap");
  if (!modalBackground) return;

  $wrap?.removeChild(modalBackground);
}
