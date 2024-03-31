import Modal from '../components/Modal/Modal';

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
};

export default ModalController;
