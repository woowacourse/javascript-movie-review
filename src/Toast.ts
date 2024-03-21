class Toast {
  $target: HTMLElement = document.createElement('div');
  message;
  constructor(message: string) {
    this.message = message;
    this.$target.id = 'toast_message';
  }

  on(message: string) {
    this.$target.classList.add('active');
    this.$target.textContent = message;
    setTimeout(() => {
      this.$target.classList.remove('active');
    }, 1000);
  }
}

export default Toast;
