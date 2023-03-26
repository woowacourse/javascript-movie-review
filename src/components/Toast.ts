import { $ } from '../utils/selector';

export type ToastProps = {
  message: string;
  duration?: number;
};

export class Toast {
  private readonly $root = document.createElement('div');

  constructor({ message, duration = 4000 }: ToastProps) {
    this.$root.innerText = message;
    this.$root.classList.add('toast', 'fade');

    this.$root.addEventListener('animationend', () => {
      this.$root.classList.remove('fade');

      setTimeout(() => {
        this.$root.classList.add('fade', 'dispose');
        this.$root.addEventListener('animationend', () => {
          this.$root.remove();
        });
      }, duration);
    });
  }

  getRoot() {
    return this.$root;
  }

  static create(message: string, duration?: number) {
    const toast = new Toast({ message, duration });
    $('#toast-container').append(toast.getRoot());
    return toast;
  }
}
