import './style.css';
import { DETAIL_MODAL_TEMPLATE } from '../../constants/templates';

const detailModal = () => {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = DETAIL_MODAL_TEMPLATE();

  const container = document.querySelector('#app');
  if (container) {
    container.appendChild(dialog);
  }
};

export default detailModal;
