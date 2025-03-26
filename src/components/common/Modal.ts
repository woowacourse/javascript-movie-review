import { createElement } from "../../utils/createElement";

const Modal = () => {
  const modal = createElement(/*html*/ `
    <div class="modal-background" id="modalBackground"></div>  
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
    </div>
  `);

  return modal;
};

export default Modal;
