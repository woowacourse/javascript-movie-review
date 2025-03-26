import { $, html, variant } from '@/lib/utils';
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
      class="toast 
      ${variant({
        'toast-success': this.props.type === TOAST_TYPE.success,
        'toast-error': this.props.type === TOAST_TYPE.error,
      })}"
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
