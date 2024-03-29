import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import { querySelector } from '../../../utils/dom/selector';
import { ELEMENT_SELECTOR } from '../../../constants/Selector';
import './ErrorModal.css';

class ErrorModal extends Component {
  $modal: Modal | undefined;

  protected render(): void {
    this.$modal = new Modal(this.$element, { id: 'error-fallback-modal' });
  }

  protected initializeState(): void {
    if (!this.$modal) return;

    console.log(this.$modal);
    this.$modal.createModalContent(this.createComponent());
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
    const $reloadButton = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.reloadButton, this.$element);
    $reloadButton.addEventListener('click', this.handleReloadButtonClick.bind(this));
  }

  openModal() {
    this.$modal?.open();
  }

  private handleReloadButtonClick() {
    window.location.reload();
  }
}

export default ErrorModal;
