export class Toast {
  private element = document.createElement('div');

  constructor(private readonly message: string) {
    this.element.innerText = this.message;
    this.element.classList.add('toast');

    setTimeout(() => {
      this.element.classList.add('fade-out');
      setTimeout(() => {
        this.element.remove();
      }, 1000);
    }, 5000);
  }

  static create(message: string) {
    const toast = new Toast(message);
    document.querySelector('#toast-container')!.append(toast.render());
    return toast;
  }

  render() {
    return this.element;
  }
}
