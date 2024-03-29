import { ESC_KEY, MOVIE_INFO_COMMON_CLASS } from '../constants';
import { debouceFunc } from '../utils';

import { renderAlertModalForNullEl } from './AlertModalForNullController';
import ScrollController from './ScrollController';

const ModalContainerController = {
  closeModalByESC(event: KeyboardEvent) {
    debouceFunc(() => {
      if (event.key === ESC_KEY) {
        ModalContainerController.closeModalContainer();
      }
    });
  },

  closeModalContainer() {
    const $modalContainer = document.querySelector('.modal-container');
    const $movieInfoModal = document.querySelector(
      `.${MOVIE_INFO_COMMON_CLASS}`,
    );
    if ($movieInfoModal) ModalContainerController.changePosition();
    $modalContainer?.remove();
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
    const $modalContainer = document.querySelector('.modal-container');
    if (!($modalContainer instanceof HTMLElement)) {
      renderAlertModalForNullEl('modal-container');
      return;
    }
    $modalContainer.style.top = `${window.scrollY}PX`;
  },

  private_isWrongCloseTarget(event: Event) {
    const { target } = event;
    return !(target instanceof HTMLElement) || target.closest('.modal');
  },
};

export default ModalContainerController;
