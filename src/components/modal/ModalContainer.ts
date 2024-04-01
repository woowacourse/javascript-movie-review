import {
  createElementWithAttribute,
  ElementFinder,
  ScrollController,
} from '../../utils';

import ModalContainerController from './controller/ModalContainerController';

const MODAL_CONTAINER_CLASS = 'modal-container';
interface ModalContainerProps {
  $children: HTMLElement;
  onCloseExtraFunc?: () => void;
  isKeepExistingModal?: boolean;
}

class ModalContainer {
  #element: HTMLElement;

  constructor(props: ModalContainerProps) {
    this.#element = this.#makeModalContainer(props);
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
      class: `${MODAL_CONTAINER_CLASS}__inner`,
    });
    $children.classList.add('modal');
    $modalContainerInner.appendChild(
      this.#makeModalBackground(onCloseExtraFunc),
    );
    $modalContainerInner.appendChild($children);

    return $modalContainerInner;
  }

  #makeModalContainer(props: ModalContainerProps) {
    const $modalContainer = createElementWithAttribute('div', {
      class: MODAL_CONTAINER_CLASS,
    });
    $modalContainer.appendChild(this.#makeModalContainerInner(props));

    return $modalContainer;
  }

  #renderModalContainer(props: ModalContainerProps) {
    const $app = ElementFinder.findElementBySelector('#app');
    if (!$app) return;
    const isDeleteExistingModal =
      !props.isKeepExistingModal &&
      document.querySelector(`.${MODAL_CONTAINER_CLASS}`);
    // 이전에 열린 모달 제거
    if (isDeleteExistingModal) {
      console.log('delete');
      ModalContainerController.closeModalContainer();
    }
    //새로운 모달 생성
    $app.appendChild(this.#element);
  }
}

export default ModalContainer;
