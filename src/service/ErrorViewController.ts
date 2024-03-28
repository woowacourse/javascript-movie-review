import { ErrorMessage, ErrorView } from '../components';

import ModalContainerController from './ModalContainerController';

const ErrorViewController = {
  showErrorViewInMain(error: unknown, extraExtraBoxClass?: string) {
    if (!(error instanceof Error)) return;

    document.querySelector('.movie-list-container')?.remove();
    const $message = new ErrorMessage(error.message).element;
    const errorView = new ErrorView({
      errorMessage: $message,
      errorImageType: 'triangle',
      extraExtraBoxClass,
    });
    errorView.renderErrorViewInMain();
  },

  removeErrorViewInMain() {
    document.querySelector('.error-view')?.remove();
  },

  showErrorViewInModal(error: unknown, extraExtraBoxClass?: string) {
    if (!(error instanceof Error)) return;
    const $message = new ErrorMessage(error.message).element;
    const errorView = new ErrorView({
      errorMessage: $message,
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
