import DetailModalController from '../../controllers/DetailModalController';
import Button from '../common/Button';

const handleModalCloseButtonClick = () => {
  DetailModalController.closeModal();
};

export default function CloseButton() {
  const $button = Button({
    button: { type: 'button', text: '×', class: 'detail-modal-close-button', click: handleModalCloseButtonClick }
  });

  return $button;
}
