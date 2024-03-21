import '../Toast/Toast.css';

class Toast {
  toastMessage = document.createElement('div');

  constructor(messageText: string) {
    this.toastMessage.classList.add('toast-message');
    this.toastMessage.textContent = messageText;

    const appContainer = document.querySelector('main');
    if (!appContainer) return;
    appContainer.append(this.toastMessage);

    this.toastOn();
    this.removeToast();
  }

  toastOn() {
    this.toastMessage.classList.remove('hide-toast');

    setTimeout(() => {
      this.toastMessage.classList.add('hide-toast');
    }, 1000);
  }

  removeToast() {
    setTimeout(() => {
      this.toastMessage.remove();
    }, 2000);
  }
}

export default Toast;
