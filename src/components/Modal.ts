import MovieDetails from "../types/MovieDetails";
import MovieItemModal from "./MovieItemModal";
import createElement from "./utils/createElement";

const Modal = (movieDetails: MovieDetails) => {
  const $modalBg = createElement({
    tag: "div",
    classNames: ["modal-background", "active"],
    attributes: {
      id: "modalBackground",
    }
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
  
    $modalBg.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
  
      if (target.id === "closeModal") {
        closeModal();
      }
  
      if (target.closest(".my-rate .star")) {
        const $star = target.closest(".star") as HTMLElement;
        const newRate = Number($star.dataset.starValue);
        localStorage.setItem(String(movieDetails.id), String(newRate));
        render(newRate);
      }
    });
  
    escapeListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", escapeListener);
  };
  

  const initialRate = Number(localStorage.getItem(String(movieDetails.id))) || 0;
  render(initialRate);
  bindEvents();

  return $modalBg;
};

export default Modal;
