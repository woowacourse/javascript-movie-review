import MessageModal from "../component/MessageModal";

class MessageModalController {
  messageModalElement;

  constructor() {
    this.messageModalElement = MessageModal("") as HTMLDialogElement;

    this.renderMessageModalFrame();
  }

  bindEvents() {
    this.messageModalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.messageModalElement.close();
    });
  }

  renderMessageModalFrame() {
    document.body.appendChild(this.messageModalElement);
    this.bindEvents();
  }

  changeContentMessage(text: string) {
    const spanElement = this.messageModalElement.querySelector("span") as HTMLSpanElement;

    if (spanElement) spanElement.innerText = text;

    this.messageModalElement.showModal();
  }
}
export default MessageModalController;
