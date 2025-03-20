import MessageModal from "../component/MessageModal";

class MessageModalController {
  mainElement;
  messageModalElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
    this.messageModalElement = MessageModal("") as HTMLDialogElement;

    this.renderMessageModalFrame();
  }

  bindEvents() {
    this.messageModalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.messageModalElement.close();
    });
  }

  renderMessageModalFrame() {
    this.mainElement.insertAdjacentElement(
      "afterend",
      this.messageModalElement,
    );
    this.bindEvents();
  }

  changeContentMessage(text: string) {
    const spanElement = this.messageModalElement.querySelector(
      "span",
    ) as HTMLSpanElement;

    if (spanElement) spanElement.innerText = text;
  }
}
export default MessageModalController;
