export const removeDetailModal = () => {
  const $modalBackground = document.getElementById("modalBackground");
  const $closeModal = document.getElementById("closeModal");

  $closeModal?.addEventListener("click", () => {
    $modalBackground?.remove();
  });
};
