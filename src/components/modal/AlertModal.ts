import { createElementWithAttribute } from '../../utils';

import ModalContainer, { ModalContainerHandler } from './ModalContainer';

interface AlertModalInnerProps {
  $alertContentsElement: HTMLElement;
  $button: HTMLButtonElement;
}

interface AlertModalProps extends AlertModalInnerProps {
  onCloseExtraFunc?: () => void;
}

class AlertModal {
  constructor(props: AlertModalProps) {
    this.#renderAlertModal(props);
  }

  #handleClickAlertModalButton(event: Event) {
    event.stopPropagation();
    ModalContainerHandler.closeModalContainer();
  }

  #makeAlertModalInner({
    $alertContentsElement,
    $button,
  }: AlertModalInnerProps) {
    const $alertModalInner = createElementWithAttribute('div', {
      class: 'modal-alert__inner',
    });
    $button.classList.add('modal-alert__button');
    $alertContentsElement.classList.add('modal-alert__content');
    $button.addEventListener('click', () => this.#handleClickAlertModalButton);
    $alertModalInner.appendChild($alertContentsElement);
    $alertModalInner.appendChild($button);

    return $alertModalInner;
  }

  #makeAlertModal({ $alertContentsElement, $button }: AlertModalInnerProps) {
    const $alertModal = createElementWithAttribute('div', {
      class: 'modal-alert',
    });
    const $alertModalInner = this.#makeAlertModalInner({
      $alertContentsElement,
      $button,
    });
    $alertModal.appendChild($alertModalInner);

    return $alertModal;
  }

  #renderAlertModal({
    $alertContentsElement,
    $button,
    onCloseExtraFunc,
  }: AlertModalProps) {
    const $alertModal = this.#makeAlertModal({
      $alertContentsElement,
      $button,
    });

    new ModalContainer({
      $children: $alertModal,
      onCloseExtraFunc,
    });
  }
}

export default AlertModal;
