import { getMovieDetail } from "../domain/movieDetailApi";
import { $ } from "../utils/selector";

export const handleModal = () => {
  showModal();
  closeModal();
};

const showModal = () => {
  $(".item-list").addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLImageElement)) return;
    if (target.alt === "별점") return;

    await getMovieDetail(Number(target.id));

    $<HTMLDialogElement>("#movie-detail").showModal();

    const bodyStyle = $<HTMLBodyElement>("body").style;
    bodyStyle.overflow = "hidden";
  });
};

const closeModal = () => {
  $("#modal").addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    if (isClosing(target.className)) {
      $<HTMLDialogElement>("#movie-detail").close();

      const bodyStyle = $<HTMLBodyElement>("body").style;
      bodyStyle.overflow = "visible";
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
