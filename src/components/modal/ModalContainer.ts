import {
  createElementWithAttribute,
  ElementFinder,
  ScrollController,
} from '../../utils';

import ModalContainerController from './controller/ModalContainerController';

interface ModalContainerProps {
  $children: HTMLElement;
  onCloseExtraFunc?: () => void;
  /**
   * 이전에 열어 놓은 모달을 지울 것 인지 여부
   */
  isDeletePreviousModal?: boolean;
}

class ModalContainer {
  constructor(props: ModalContainerProps) {
    this.#renderModalContainer(props);
    ScrollController.preventScroll();
    ModalContainerController.handleKeyDownToCloseModal();
  }

  #makeModalBackground(onCloseExtraFunc?: () => void) {
    const $backGround = createElementWithAttribute('div', {
      class: 'modal-background',
    });

    $backGround.addEventListener('click', (event) =>
      ModalContainerController.handleClickBackgroundToCloseModal(
        event,
        onCloseExtraFunc,
      ),
    );

    return $backGround;
  }

  #makeModalContainerInner({
    $children,
    onCloseExtraFunc,
  }: ModalContainerProps) {
    const $modalContainerInner = createElementWithAttribute('div', {
      class: 'modal-container__inner',
    });
    $children.classList.add('modal');
    $modalContainerInner.appendChild(
      this.#makeModalBackground(onCloseExtraFunc),
    );
    $modalContainerInner.appendChild($children);

    return $modalContainerInner;
  }

  #renderModalContainer(props: ModalContainerProps) {
    const $app = ElementFinder.findElementBySelector('#app');
    if (!$app) return;

    if (props.isDeletePreviousModal) {
      ModalContainerController.closeModalContainer();
    }
    //모달 생성
    const $modalContainer = createElementWithAttribute('div', {
      class: 'modal-container',
    });

    $modalContainer.appendChild(this.#makeModalContainerInner(props));
    $app.appendChild($modalContainer);
  }
}

export default ModalContainer;
