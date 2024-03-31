import { ESC_KEY } from '../../../constants';
import { debouceFunc, ElementFinder, ScrollController } from '../../../utils';

const ModalContainerController = {
  closeModalByESC(event: KeyboardEvent) {
    debouceFunc(() => {
      if (event.key === ESC_KEY) {
        ModalContainerController.closeModalContainer();
      }
    });
  },

  closeModalContainer() {
    const $modalContainer =
      ElementFinder.findElementBySelector('.modal-container');
    if (!$modalContainer) return;

    $modalContainer.remove();
    ScrollController.allowScroll();
    document.removeEventListener(
      'keydown',
      ModalContainerController.closeModalByESC,
    );
  },

  handleClickBackgroundToCloseModal(
    event: Event,
    onCloseExtraFunc?: () => void,
  ) {
    event.stopPropagation();

    if (this.private_isWrongCloseTarget(event)) return;

    if (onCloseExtraFunc) onCloseExtraFunc();
    this.closeModalContainer();
  },

  handleKeyDownToCloseModal() {
    document.addEventListener(
      'keydown',
      ModalContainerController.closeModalByESC,
    );
  },

  changePosition() {
    const $modalContainer =
      ElementFinder.findElementBySelector('.modal-container');
    if (!$modalContainer) return;

    $modalContainer.style.top = `${window.scrollY}PX`;
  },

  private_isWrongCloseTarget(event: Event) {
    const { target } = event;

    return !(target instanceof HTMLElement) || target.closest('.modal');
  },
};

export default ModalContainerController;
