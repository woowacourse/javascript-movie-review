import Component from '../Component/Component';
import { createElement } from '../../../utils/dom/createElement/createElement';
import './Modal.css';

interface ModalProps {
  id: string;
  children?: string;
}

class Modal extends Component<ModalProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const dialog = createElement({
      tagName: 'dialog',
      attributeOptions: { id: this.props?.id ?? 'modal-dialog', class: this.props?.id ?? 'modal-dialog' },
    });

    dialog.innerHTML = this.props?.children ?? ``;

    return dialog;
  }
}

export default Modal;
