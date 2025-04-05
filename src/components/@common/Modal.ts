import { isModalOpen, setIsModalOpen } from "../../store/store";
import { observeLastMovie } from "../../utils/InfiniteScroll";
import MovieDetail from "../movieDetail/MovieDetail";

const Modal = () => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
      document.removeEventListener("keydown", handleEscapeKey);
      observeLastMovie();
    }
  };
  document.addEventListener("keydown", handleEscapeKey);

  return `
      <div class="modal-background ${
        isModalOpen && "active"
      }" id="modalBackground">
        <div class="modal">
          ${MovieDetail()}
        </div>
      </div>
  `;
};

export default Modal;
