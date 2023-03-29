class ToastModal {
  readonly node: HTMLDivElement;
  private closeButton!: HTMLButtonElement;
  private timer!: NodeJS.Timeout;
  private messageBox!: HTMLParagraphElement;

  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('error-modal');
    this.node.style.display = 'none';

    this.composeNode().setElements().closeAutomatically().addEvent();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <p></p>
      <button>닫기</button>
    `;

    return this;
  }

  setElements(): this {
    const closeButton = this.node.querySelector<HTMLButtonElement>('button');
    const messageBox = this.node.querySelector<HTMLParagraphElement>('p');
    if (!closeButton || !messageBox) return this;

    this.closeButton = closeButton;
    this.messageBox = messageBox;

    return this;
  }

  addEvent(): this {
    this.closeButton.addEventListener('click', this.#closeModal.bind(this));

    return this;
  }

  #closeModal(): void {
    if (this.timer) clearTimeout(this.timer);

    this.node.remove();
  }

  show(message: string) {
    this.messageBox.innerText = message;

    this.node.style.display = 'flex';
    this.closeAutomatically();
  }

  hide() {
    this.node.style.display = 'none';
  }

  closeAutomatically(): this {
    this.timer = setTimeout(() => {
      this.hide();
    }, 3000);

    return this;
  }
}

export default ToastModal;
