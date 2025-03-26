import { useEvents } from "../../utils/Core";
import { $ } from "../../utils/domHelper";

interface ModalProps {
  children: string;
}

const Modal = (props: ModalProps) => {
  const { children } = props;
  const [addEvent] = useEvents("body");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modalBg = $(".modal-background");
      if (modalBg) {
        modalBg.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }
  });

  addEvent("click", ".modal-background", (e) => {
    if ((e.target as HTMLElement).classList.contains("modal-background")) {
      const modalBg = $(".modal-background");
      if (modalBg) {
        modalBg.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }
  });

  addEvent("click", "#closeModal", () => {
    const modalBg = $(".modal-background");
    if (modalBg) {
      modalBg.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  setTimeout(() => {
    const modalBg = $(".modal-background");
    if (modalBg) {
      modalBg.classList.add("active");
      document.body.classList.add("modal-open");
    }
  }, 0);

  return `
    <div class="modal-background">
      <div class="modal">
        ${children}
      </div>
    </div>
  `;
};

export default Modal;
