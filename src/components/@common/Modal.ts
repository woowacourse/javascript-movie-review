import { isModalOpen } from "../../store/store";
import MovieDetail from "../movieDetail/MovieDetail";

const Modal = () => {
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
