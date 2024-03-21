import { createElement } from '../../../utils/dom/createElement/createElement';
import Component from '../Component/Component';

interface ModalProps {
  id: string;
  children?: string;
}

class Modal extends Component<ModalProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const dialog = createElement({ tagName: 'dialog', attributeOptions: { id: this.props?.id ?? 'modal-dialog' } });

    dialog.innerHTML = `
      <div class='modal-container'>
        ${this.props?.children}
      </div>
    `;

    return dialog;
  }
}

export default Modal;
