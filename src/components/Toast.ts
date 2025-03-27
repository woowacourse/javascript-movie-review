import { html, variant } from '@/lib/utils';
import { Modal } from './common';

interface ToastProps {
  message: string;
  type: TOAST_TYPE;
}

export const enum TOAST_TYPE {
  success = 'success',
  error = 'error',
}

export default class Toast extends Modal<ToastProps> {
  override id = 'toast';

  template() {
    return html`<div
      class="toast 
      ${variant({
        'toast-success': this.props.type === TOAST_TYPE.success,
        'toast-error': this.props.type === TOAST_TYPE.error,
      })}"
    >
      ${this.props.message}
    </div>`;
  }

  onRender() {
    setTimeout(() => {
      this.remove();
    }, 1000);
  }
}
