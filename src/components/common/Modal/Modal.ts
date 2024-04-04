import Component from '../Component/Component';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import './Modal.css';

interface ModalProps {
  id: string;
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

    return dialog;
  }

  protected setEvent(): void {
    const $dialog = querySelector<HTMLDialogElement>(`#${this.props?.id}`, this.$element);
    $dialog.addEventListener('click', this.handleBackDropClick.bind(this));
  }

  public createModalContent(content: string) {
    const $dialog = querySelector<HTMLDialogElement>(`#${this.props?.id}`, this.$element);
    $dialog.innerHTML = content;
  }

  public open() {
    const $dialog = querySelector<HTMLDialogElement>(`#${this.props?.id}`, this.$element);
    $dialog.showModal();

    document.body.style.overflow = 'hidden';
  }

  public close() {
    const $dialog = querySelector<HTMLDialogElement>(`#${this.props?.id}`, this.$element);
    $dialog.close();

    document.body.style.overflow = 'auto';
  }

  private handleBackDropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}

export default Modal;
