import { ErrorMessage, ErrorView } from '../components';

import ModalContainerController from './ModalContainerController';

const ErrorViewController = {
  showErrorViewInMain(error: unknown, extraExtraBoxClass?: string) {
    if (!(error instanceof Error)) return;
    // error-view를 main에 넣기전, move-list-container 있다면 이를 삭제
    document.querySelector('.movie-list-container')?.remove();

    const $message = new ErrorMessage(error.message).element;
    const errorView = new ErrorView({
      errorMessage: $message,
      errorImageType: 'triangle',
      extraExtraBoxClass,
    });

    errorView.renderErrorViewInMain();
  },
  /**
   * 기존에 error-view가 있다면 해당 error-view를 삭제하는 기능
   */
  removeErrorViewInMain() {
    document.querySelector('.error-view')?.remove();
  },

  showErrorViewInModal(error: unknown, extraExtraBoxClass?: string) {
    if (!(error instanceof Error)) return;

    const errorView = new ErrorView({
      errorMessage: new ErrorMessage(error.message).element,
      errorImageType: 'triangle',
      extraExtraBoxClass,
    });

    errorView.renderErrorViewInModal();
  },

  removeErrorViewInModal() {
    ModalContainerController.closeModalContainer();
  },
};

export default ErrorViewController;
