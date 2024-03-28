import { ModalContainerController, ScrollController } from '../../controller';
import { checkElementIsNotNull, createElementWithAttribute } from '../../utils';

interface ModalContainerProps {
  $children: HTMLElement;
  onCloseExtraFunc?: () => void;
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
    const $app = document.querySelector('#app');
    checkElementIsNotNull($app);
    //이전에 있는 모달 지우기
    ModalContainerController.closeModalContainer();
    //모달 생성
    const $modalContainer = createElementWithAttribute('div', {
      class: 'modal-container',
    });
    $modalContainer.appendChild(this.#makeModalContainerInner(props));

    ($app as Element).appendChild($modalContainer);
  }
}

export default ModalContainer;
