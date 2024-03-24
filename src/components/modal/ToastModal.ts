import { checkElementIsNotNull, createElementWithAttribute } from '../../utils';

type ToastModalProps = {
  $children: HTMLElement;
  id?: string;
  extraClass?: string;
};

class ToastModal {
  #element: HTMLElement;
  #time: ReturnType<typeof setTimeout> | undefined;

  constructor(props: ToastModalProps) {
    this.#element = this.#makeToastModal(props);
  }

  /**
   * @param {boolean} isNow 바로 토스트 모달을 삭제할 것 인지, 시간을 두고 토스트 모달이 희미해진 후 삭제할 것 인지 여부
   */
  removeToastModal(isNow: boolean) {
    const $toastModal = document.querySelector('.toast-modal');
    if (!$toastModal) return;
    $toastModal.classList.remove('on');

    setTimeout(
      () => {
        $toastModal.remove();
        this.#resetTime();
      },
      isNow ? 0 : 500,
    );
  }

  handleRenderingToastModal(parentElement: HTMLElement | null) {
    this.#showToastModal(parentElement);

    this.#time = setTimeout(() => {
      this.removeToastModal(false);
    }, 3000);
  }

  #makeToastModal({ $children, id, extraClass }: ToastModalProps) {
    const $toastModal = createElementWithAttribute('div', {
      class: 'toast-modal',
    });
    if (id) $toastModal.id = id;
    if (extraClass) $toastModal.classList.add(extraClass);

    $children.classList.add('toast-modal__inner');
    $toastModal.appendChild($children);

    return $toastModal;
  }

  #showToastModal(parentElement: HTMLElement | null) {
    checkElementIsNotNull(parentElement);
    //이전에 토스트 모달이 열려있는 경우 이름 삭제
    document.querySelector('.toast-modal')?.remove();

    (parentElement as HTMLElement).appendChild(this.#element);

    setTimeout(() => {
      this.#element.classList.add('on');
    }, 100);
  }

  #resetTime() {
    clearTimeout(this.#time);
    this.#time = undefined;
  }
}

export default ToastModal;
