import { ELEMENT_SELECTOR } from '../../../constants/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';
import { querySelector } from '../../../utils/dom/selector';
import Component from '../../common/Component/Component';

class ModalCloseButton extends Component {
  protected render() {
    this.$element.insertAdjacentHTML('beforeend', this.createComponent());
  }

  protected createComponent() {
    return /* html */ `
      <button id="modal-close-button" type="button" class="modal-close-button">
        <svg viewBox="0 0 40 40">
          <path class="modal-close-icon" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
        </svg>
      </button>
    `;
  }

  protected setEvent(): void {
    const $modalCloseButton = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.modalCloseButton, this.$element);

    on({
      target: $modalCloseButton,
      eventName: 'click',
      eventHandler: this.handleModalCloseButton.bind(this),
    });
  }

  private handleModalCloseButton() {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal);

    $modal.close();
  }
}

export default ModalCloseButton;
