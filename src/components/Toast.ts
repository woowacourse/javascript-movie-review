import { $, html } from '@/lib/utils';
import Component from './core/Component';

interface ToastProps {
  message: string;
  type: TOAST_TYPE;
}

export const enum TOAST_TYPE {
  success = 'success',
  error = 'error',
}

export default class Toast extends Component<ToastProps> {
  template() {
    return html`<div
      class="toast ${this.props.type === TOAST_TYPE.success ? 'toast-success' : ''} ${this.props.type ===
      TOAST_TYPE.error
        ? 'toast-error'
        : ''}"
    >
      ${this.props.message}
    </div>`;
  }

  show() {
    $('#toast')?.appendChild(this.element);

    setTimeout(() => {
      this.remove();
    }, 1000);
  }

  remove() {
    this.element.remove();
  }
}
