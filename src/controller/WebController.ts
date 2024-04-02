import HeaderController from './HeaderController';
import ModalController from './ModalController';

const WebController = {
  setup() {
    ModalController.observerModal();
    HeaderController.resizeObserver();
  },
};

export default WebController;
