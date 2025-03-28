export const removeDetailModal = () => {
  const $modalBackground = document.getElementById("modalBackground");
  const $closeModal = document.getElementById("closeModal");

  $modalBackground?.addEventListener("click", (e) => {
    if (e.target === $modalBackground) {
      $modalBackground.remove();
    }
  });

  $closeModal?.addEventListener("click", () => {
    $modalBackground?.remove();
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      $modalBackground?.remove();
    }
  });
};
