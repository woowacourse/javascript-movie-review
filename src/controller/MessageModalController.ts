import MessageModalView from "../view/MessageModalView";

class MessageModalController {
  #view;

  constructor() {
    this.#view = new MessageModalView();
  }

  changeContentMessage(text: string) {
    this.#view.updateText(text);
  }

  showModal(text: string) {
    this.#view.updateText(text);
    this.#view.show();
  }

  closeModal() {
    this.#view.close();
  }
}
export default MessageModalController;
