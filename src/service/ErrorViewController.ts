import ErrorMessage from '../components/error/ErrorMessage';
import ErrorView from '../components/error/ErrorView';

const ErrorViewController = {
  showErrorView(error: unknown, extraExtraBoxClass?: string) {
    if (error instanceof Error) {
      document.querySelector('.movie-list-container')?.remove();
      const $message = new ErrorMessage(error.message).element;

      new ErrorView({
        errorMessage: $message,
        errorImageType: 'triangle',
        extraExtraBoxClass,
      });
    }
  },

  removeErrorView() {
    document.querySelector('.error-view')?.remove();
  },
};

export default ErrorViewController;
