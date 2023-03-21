export class Toast {
  private $root = document.createElement('div');

  constructor(private readonly message: string) {
    this.$root.innerText = this.message;
    this.$root.classList.add('toast');

    setTimeout(() => {
      this.$root.classList.add('fade-out');
      setTimeout(() => {
        this.$root.remove();
      }, 1000);
    }, 5000);
  }

  getRoot() {
    return this.$root;
  }

  static create(message: string) {
    const toast = new Toast(message);
    document.querySelector('#toast-container')!.append(toast.getRoot());
    return toast;
  }
}
