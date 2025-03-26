import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";

const Modal = () => {
  const modal = createElement(
    /*html*/ `
    <div class="modal-background" id="modalBackground" >
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
      </div>
    </div>  
  `,
    {
      click: closeModal,
    }
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  $("#closeModal", modal).addEventListener("click", closeModal);
  $(".modal", modal).addEventListener("click", (e) => e.stopPropagation());

  return modal;
};

function closeModal() {
  $(".modal-container").remove();
  $("#modalBackground").classList.remove("active");
}

export default Modal;
