import MessageModal from "../component/MessageModal";
import mainElement from "../dom/mainElement";
import { $ } from "../util/selector";

class MessageModalController {
  mainElement;
  messageModalElement;

  constructor() {
    this.mainElement = mainElement;
    this.messageModalElement = MessageModal("") as HTMLDialogElement;

    this.renderMessageModalFrame();
  }

  bindEvents() {
    this.messageModalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.closeModal();
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }

  renderMessageModalFrame() {
    this.mainElement.insertAdjacentElement("afterend", this.messageModalElement);
    this.bindEvents();
  }

  changeContentMessage(text: string) {
    const spanElement = $("span", this.messageModalElement);

    if (spanElement) spanElement.innerText = text;
  }

  showModal() {
    this.messageModalElement.classList.add("active");
  }

  closeModal() {
    this.messageModalElement.classList.remove("active");
  }
}
export default MessageModalController;
