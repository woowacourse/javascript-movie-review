class ToastModal {
  private node: HTMLDivElement;
  private closeButton!: HTMLButtonElement;
  private timer!: NodeJS.Timeout;

  constructor(errorMessage: string) {
    this.node = document.createElement('div');
    this.node.classList.add('error-modal');

    this.composeNode(errorMessage).setElements().automaticClose().addEvent();
  }

  composeNode(message: string): this {
    this.node.innerHTML = `
      <p>${message}</p>
      <button>닫기</button>
    `;

    return this;
  }

  setElements(): this {
    const closeButton = this.node.querySelector<HTMLButtonElement>('button');
    if (!closeButton) return this;

    this.closeButton = closeButton;

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

  show() {
    document.body.append(this.node);
  }

  automaticClose(): this {
    this.timer = setTimeout(() => {
      this.node.remove();
    }, 3000);

    return this;
  }
}

export default ToastModal;
