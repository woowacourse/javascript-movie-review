import { PropsWithChildren } from "../../../types";
import { isOpenModal, setIsOpenModal } from "../../store/store";
import { useEvents } from "../../utils/Core";
import { $ } from "../../utils/domHelper";

interface ModalProps {}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children } = props;
  const [addEvent] = useEvents("body");

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const closeModal = () => {
    const modalBg = $(".modal-background");
    if (modalBg) {
      modalBg.classList.remove("active");
      document.body.classList.remove("modal-open");
      setIsOpenModal(false);

      document.removeEventListener("keydown", handleEsc);
    }
  };

  if (isOpenModal) {
    document.addEventListener("keydown", handleEsc);

    addEvent("click", ".modal-background", (e) => {
      if ((e.target as HTMLElement).classList.contains("modal-background")) {
        closeModal();
      }
    });

    addEvent("click", "#closeModal", () => {
      closeModal();
    });

    setTimeout(() => {
      const modalBg = $(".modal-background");
      if (modalBg) {
        modalBg.classList.add("active");
        document.body.classList.add("modal-open");
      }
    }, 0);
  }

  return `
    <div class="modal-background">
      <div class="modal">
        ${children}
      </div>
    </div>
  `;
};

export default Modal;
