import { DELAY } from '../../consts/common';
import '../Toast/Toast.css';

class Toast {
  toastMessage = document.createElement('div');

  constructor(messageText: string) {
    this.toastMessage.classList.add('toast-message');
    this.toastMessage.textContent = messageText;

    const appContainer = document.querySelector('main');
    if (!appContainer) return;
    appContainer.append(this.toastMessage);

    this.showToast();
    this.removeToast();
  }

  showToast() {
    this.toastMessage.classList.remove('hide-toast');

    setTimeout(() => {
      this.toastMessage.classList.add('hide-toast');
    }, DELAY.TOAST_HIDE);
  }

  removeToast() {
    setTimeout(() => {
      this.toastMessage.remove();
    }, DELAY.TOAST_REMOVE);
  }
}

export default Toast;
