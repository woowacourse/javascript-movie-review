import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import { querySelector } from '../../../utils/dom/selector';
import './ErrorModal.css';

class ErrorModal extends Component {
  modal: Modal | undefined;

  protected render(): void {
    this.modal = new Modal(this.$element, { id: 'error-modal' });
  }

  protected initializeState(): void {
    if (!this.modal) return;

    this.modal.createModalContent(this.createComponent());
  }

  protected createComponent() {
    return /* html */ `
      <div class="modal-container">
        <p>시스템 오류가 발생했습니다. 다시 시작해 주세요.</p>
        <button type="button" id="reload-button" class="btn primary">다시 시도하기</button>
      </div>
    `;
  }

  protected setEvent(): void {
    const $reloadButton = querySelector<HTMLButtonElement>('#reload-button', this.$element);
    $reloadButton.addEventListener('click', this.reload);
  }

  openModal() {
    this.modal?.open();
  }

  private reload() {
    window.location.reload();
  }
}

export default ErrorModal;
