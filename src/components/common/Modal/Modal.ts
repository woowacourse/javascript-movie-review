import Component from '../Component/Component';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';

import './Modal.css';

interface ModalProps {
  id: string;
  class?: string;
  children?: string;
}

class Modal extends Component<ModalProps> {
  protected createComponent() {
    const dialog = createElement({
      tagName: 'dialog',
      attributeOptions: { id: this.props?.id ?? 'modal-dialog', class: this.props?.class ?? '' },
    });

    dialog.innerHTML = `
      <div class='modal-container'>
        ${this.props?.children}
      </div>
    `;

    return dialog;
  }

  protected setEvent() {
    const $modal = querySelector<HTMLDialogElement>(`#${this.props?.id}` ?? '', this.$element);

    $modal.addEventListener('click', (event) => this.closeModal(event, $modal));
  }

  private closeModal(event: MouseEvent, $modal: HTMLDialogElement) {
    if (event.target === $modal) {
      $modal.close();
    }
  }
}

export default Modal;
