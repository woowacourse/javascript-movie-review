import { getMovieDetail } from "../../domain/movieDetailApi";
import { $ } from "../../utils/selector";
import { RATING_MESSAGES } from "../../constants";

export const handleModal = () => {
  showModal();
  closeModal();
};

const showModal = () => {
  $(".item-list").addEventListener("click", async ({ target }) => {
    if (!(target instanceof HTMLImageElement) || target.alt === "별점") return;

    await getMovieDetail(Number(target.id));

    const userRatings = localStorage.getItem(target.id);
    const ratings = `${userRatings ? Number(userRatings) * 10 : 0}%`;
    $<HTMLDivElement>(`#filled-stars`).style.width = ratings;

    $<HTMLDialogElement>("#movie-detail").showModal();

    handleUserRatings();
  });
};

const closeModal = () => {
  $("#modal").addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    if (isClosing(target.className)) {
      $<HTMLDialogElement>("#movie-detail").close();
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

    const ratings = localStorage.getItem(movieId);
    $(".user-ratings").textContent = `${ratings}`;

    const message = RATING_MESSAGES[ratings ? ratings : "0"];
    $(".message").textContent = `${message}`;
  });
};
