import { $ } from "../utils/selector";

export const handleModal = () => {
  showModal();
  closeModal();
};

const showModal = () => {
  $(".item-list").addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLImageElement)) return;
    if (target.alt === "별점") return;

    $<HTMLDialogElement>("#movie-detail").showModal();
    preventScroll();
  });
};

const closeModal = () => {
  $("#modal").addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    if (isClosing(target.className)) {
      $<HTMLDialogElement>("#movie-detail").close();
      preventScroll();
    }
  });
};

const isClosing = (className: string) => {
  return Boolean(
    ["modal-close-button", "bi bi-x-lg", "modal-backdrop"].filter(
      (section) => section === className
    ).length
  );
};

const preventScroll = () => {
  const bodyStyle = $<HTMLBodyElement>("body").style;

  if (bodyStyle.overflow === "hidden") {
    bodyStyle.overflow = "visible";
  } else {
    bodyStyle.overflow = "hidden";
  }
};
