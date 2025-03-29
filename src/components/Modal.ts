import MovieDetails from "../types/MovieDetails";
import MovieItemModal from "./MovieItemModal";
import createElement from "./utils/createElement";

const STAR_MESSAGES = {
  0: "아직 평가하지 않았어요",
  1: "최악이예요",
  2: "별로예요",
  3: "보통이에요",
  4: "재미있어요",
  5: "명작이에요",
} as const;

const Modal = (movieDetails: MovieDetails) => {
  const $modalBg = createElement({
    tag: "div",
    classNames: ["modal-background", "active"],
    id: "modalBackground",
  });

  const $gnb = document.querySelector(".gnb");
  let escapeListener: ((e: KeyboardEvent) => void) | null = null;

  const render = (rate: number) => {
    $modalBg.innerHTML = MovieItemModal(movieDetails, rate);
  };

  const closeModal = () => {
    $gnb?.classList.remove("disappear");
    $modalBg.remove();
    if (escapeListener) {
      document.removeEventListener("keydown", escapeListener);
    }
  };

  const bindEvents = () => {
    $gnb?.classList.add("disappear");

    const $closeBtn = $modalBg.querySelector("#closeModal");
    $closeBtn?.addEventListener("click", closeModal);

    escapeListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", escapeListener);

    const $stars =
      $modalBg.querySelectorAll<HTMLImageElement>(".my-rate .star");
    $stars.forEach(($star) => {
      $star.addEventListener("click", () => {
        const newRate = Number($star.dataset.starValue);
        localStorage.setItem(String(movieDetails.id), String(newRate));
        render(newRate);
        bindEvents();
      });
    });
  };

  const initialRate =
    Number(localStorage.getItem(String(movieDetails.id))) || 0;
  render(initialRate);
  bindEvents();

  return $modalBg;
};

export default Modal;
