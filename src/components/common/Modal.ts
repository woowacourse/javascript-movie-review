import saveRating from "../../domain/saveRating";
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
  const url = new URL(location.href);
  const movieId = parseInt(url.searchParams.get("movieID") || "0");

  url.search = "";
  window.history.replaceState({}, "", url.toString());

  const modal = $(".modal-container");
  const score = parseInt($(".check-score", modal).innerText);

  saveRating(movieId, score);
  $(".modal-container").remove();
  $("#modalBackground").classList.remove("active");
}

export default Modal;
