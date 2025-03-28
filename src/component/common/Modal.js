import { getElement } from "../../util/utils";

function Modal(id, content) {
    function createModalBackdrop(id) {
        const $el = document.querySelector(".modal-background")
        $el.id = id
        
        $el.addEventListener("click", () => Modal.close(id));
        
        return $el;
    }
        
    function createModalContainer(content) {
        const $el = document.querySelector(".modal")
        $el.innerHTML=content

        $el.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    createModalBackdrop(id)
    createModalContainer(content)
}

Modal.open = function (id) {
    const $el = document.getElementById(id)
    $el.classList.add("active")

    Modal.keydownHandler = (e) => {
        if (e.key === "Escape") {
        Modal.close(id);
        }
    };

    document.addEventListener("keydown", Modal.keydownHandler, { once: true });
};

Modal.close = function (id) {
  const $el = document.getElementById(id)
  $el.classList.remove("active")

  if (Modal.keydownHandler) {
    document.removeEventListener("keydown", Modal.keydownHandler);
    Modal.keydownHandler = null;
  }
};

export default Modal;