import MessageModal from "../components/MessageModal";
import { ERROR_MESSAGE } from "../constant/errorMessage";
import { eventEmitter } from "../util/eventEmitter";

class MessageModalController {
  messageModalElement;

  constructor() {
    this.messageModalElement = MessageModal("") as HTMLDialogElement;
  }

  initialize() {
    this.render();
    this.bindEvents();
  }

  render() {
    document.body.appendChild(this.messageModalElement);
  }

  bindEvents() {
    this.messageModalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.messageModalElement.close();
    });

    eventEmitter.on("openMessageModal:error", (code: number) => {
      const message = ERROR_MESSAGE[code] || "알 수 없는 오류가 발생했습니다.";
      this.changeMessage(message);
      this.messageModalElement.showModal();
    });
  }

  changeMessage(message: string) {
    const spanElement = this.messageModalElement.querySelector("span") as HTMLSpanElement;
    if (spanElement) spanElement.innerText = message;
  }
}
export default MessageModalController;
