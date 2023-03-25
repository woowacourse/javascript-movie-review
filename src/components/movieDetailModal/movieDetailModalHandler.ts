import { getMovieDetail } from "../../domain/movieDetailApi";
import { $ } from "../../utils/selector";
import { RATING_MESSAGES } from "../../constants";

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

    $<HTMLDivElement>(`#filled-stars`).style.width = `${
      Number(localStorage.getItem(target.id))
        ? Number(localStorage.getItem(target.id)) * 10
        : 0
    }%`;

    $<HTMLDialogElement>("#movie-detail").showModal();

    const bodyStyle = $<HTMLBodyElement>("body").style;
    bodyStyle.overflow = "hidden";

    handleUserRatings();
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

const handleUserRatings = () => {
  $("#user-ratings-input").addEventListener("input", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;

    $<HTMLDivElement>(`#filled-stars`).style.width = `${
      Number(target.value) * 10
    }%`;

    const movieId = target.className.replace("-ratings", "");
    localStorage.setItem(movieId, target.value);

    const rating = localStorage.getItem(movieId);
    $(".rating").textContent = `${rating}`;

    const message = RATING_MESSAGES[rating ? rating : "0"];
    $(".message").textContent = `${message}`;
  });
};
