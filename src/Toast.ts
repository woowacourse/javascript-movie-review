import CONFIG from './constants/config';

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
    }, CONFIG.TOAST_MESSAGE_DELAY);
  }
}

export default Toast;
