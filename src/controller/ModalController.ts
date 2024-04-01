import Modal from '../components/Modal/Modal';
import StarRatingController from './StarRatingController';

const ModalController = {
  openModal(res: Movie) {
    const $app = document.getElementById('app');
    const $modal = Modal(res).render();
    $app?.appendChild($modal);
  },

  closeModal() {
    const $app = document.getElementById('app');
    const $modal = document.querySelector('.modal') as HTMLElement;
    const $modalCloseBtn = document.querySelector('.modal-body__close-btn img');
    $modalCloseBtn?.addEventListener('click', () => {
      $app?.removeChild($modal);
    });
  },

  observerModal() {
    const $app = document.getElementById('app') as HTMLElement;
    const option = {
      childList: true,
      subtree: true,
    };

    const callback = (mutationList: MutationRecord[]) => {
      const $target = mutationList[0].target.lastChild as HTMLElement;
      const targetId = Number($target.id);
      if (
        $target.nodeType === Node.ELEMENT_NODE &&
        $target.classList.contains('modal')
      ) {
        StarRatingController.changeStarFilled(targetId);
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe($app, option);
  },
};

export default ModalController;
