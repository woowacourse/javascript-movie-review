import { ESC_KEY } from '../../constants';
import {
  checkElementIsNotNull,
  createElementWithAttribute,
  debouceFunc,
} from '../../utils';

interface ModalContainerProps {
  $children: HTMLElement;
  onCloseExtraFunc?: () => void;
}

const ScrollController = {
  allowScroll() {
    document.body.style.overflow = 'auto';
  },

  preventScroll() {
    document.body.style.overflow = 'hidden';
  },
};

export const ModalContainerHandler = {
  closeModalByESC(event: KeyboardEvent) {
    debouceFunc(() => {
      if (event.key === ESC_KEY) {
        ModalContainerHandler.closeModalContainer();
      }
    });
  },

  closeModalContainer() {
    const $modalContainer = document.querySelector('.modal-container');
    $modalContainer?.remove();
    ScrollController.allowScroll();
    document.removeEventListener(
      'keydown',
      ModalContainerHandler.closeModalByESC,
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
    document.addEventListener('keydown', ModalContainerHandler.closeModalByESC);
  },

  private_isWrongCloseTarget(event: Event) {
    const { target } = event;
    return !(target instanceof HTMLElement) || target.closest('.modal');
  },
};

class ModalContainer {
  constructor(props: ModalContainerProps) {
    this.#renderModalContainer(props);
    ScrollController.preventScroll();
    ModalContainerHandler.handleKeyDownToCloseModal();
  }

  #makeModalBackground(onCloseExtraFunc?: () => void) {
    const $backGround = createElementWithAttribute('div', {
      class: 'modal-background',
    });

    $backGround.addEventListener('click', (event) =>
      ModalContainerHandler.handleClickBackgroundToCloseModal(
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
    ModalContainerHandler.closeModalContainer();
    //모달 생성
    const $modalContainer = createElementWithAttribute('div', {
      class: 'modal-container',
    });
    $modalContainer.appendChild(this.#makeModalContainerInner(props));

    ($app as Element).appendChild($modalContainer);
  }
}

export default ModalContainer;
