import { PropsWithChildren } from "../../../types";
import { isOpenModal, setIsOpenModal } from "../../store/store";
import { useEvents } from "../../utils/Core";
import { $ } from "../../utils/domHelper";

interface ModalProps {}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children } = props;
  const [addEvent] = useEvents("body");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modalBg = $(".modal-background");
      if (modalBg) {
        modalBg.classList.remove("active");
        document.body.classList.remove("modal-open");
        setIsOpenModal(false);
      }
    }
  });

  addEvent("click", ".modal-background", (e) => {
    if ((e.target as HTMLElement).classList.contains("modal-background")) {
      const modalBg = $(".modal-background");
      if (modalBg) {
        modalBg.classList.remove("active");
        document.body.classList.remove("modal-open");
        setIsOpenModal(false);
      }
    }
  });

  addEvent("click", "#closeModal", () => {
    const modalBg = $(".modal-background");
    if (modalBg) {
      modalBg.classList.remove("active");
      document.body.classList.remove("modal-open");
      setIsOpenModal(false);
    }
  });

  if (isOpenModal) {
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
