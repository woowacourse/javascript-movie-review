import { createElement } from '../../../utils/dom/createElement/createElement';
import Component from '../Component/Component';

interface ModalProps {
  id: string;
  children?: HTMLElement[];
}

class Modal extends Component<ModalProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent(): HTMLElement {
    const dialog = createElement({ tagName: 'dialog', attributeOptions: { id: this.props?.id ?? 'modal-dialog' } });
    const modalContainer = createElement({ tagName: 'div', attributeOptions: { class: 'modal-container' } });
    if (this.props?.children) {
      modalContainer.append(...this.props.children);
    }

    dialog.append(modalContainer);

    return dialog;
  }
}

export default Modal;
